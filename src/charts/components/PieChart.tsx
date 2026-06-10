import { useState } from "react";
import { ChartFrame } from "../core/ChartFrame";
import type { ChartTooltipPayload, RadialChartProps } from "../core/types";
import { createArcPath, getChartCssVariables, polarToCartesian, toChartData } from "../utils";

const chartColors = [
  "var(--ak-color-primary)",
  "var(--ak-color-secondary)",
  "var(--ak-color-success)",
  "var(--ak-color-warning)",
  "var(--ak-color-danger)",
  "var(--ak-color-info)",
];

export function PieChart({
  animated = true,
  className,
  colors,
  data,
  emptyState,
  height = 280,
  innerRadiusRatio = 0,
  labelKey = "label",
  legend = true,
  loading = false,
  loadingState,
  renderTooltip,
  showLabels = false,
  showLegend,
  showTooltip = true,
  style,
  tooltipStyle,
  valueKey = "value",
  width = 360,
}: RadialChartProps) {
  const [tooltip, setTooltip] = useState<ChartTooltipPayload | null>(null);
  const chartData = toChartData(data, labelKey, valueKey);
  const total = chartData.reduce((sum, item) => sum + Math.max(0, item.value), 0);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 16;
  let currentAngle = 0;

  const donutColors = colors?.donut ?? chartColors;
  const chartStyle = { ...getChartCssVariables(colors), ...style };

  return (
    <ChartFrame
      animated={animated}
      className={className}
      empty={chartData.length === 0 || total === 0}
      emptyState={emptyState}
      height={height}
      legend={showLegend ?? legend}
      legendItems={chartData.map((item, index) => ({ color: donutColors[index % donutColors.length], label: item.label }))}
      loading={loading}
      loadingState={loadingState}
      renderTooltip={renderTooltip}
      style={chartStyle}
      tooltip={showTooltip ? tooltip : null}
      tooltipStyle={tooltipStyle}
      width={width}
    >
      <svg className="ak-chart__svg" role="img" viewBox={`0 0 ${width} ${height}`}>
        {chartData.map((item, index) => {
          const angle = (Math.max(0, item.value) / total) * 360;
          const start = currentAngle;
          const end = currentAngle + angle;
          currentAngle = end;
          const middleAngle = start + angle / 2;
          const labelPoint = polarToCartesian(centerX, centerY, radius * 0.65, middleAngle);
          const tooltipPoint = polarToCartesian(centerX, centerY, radius * 0.78, middleAngle);
          const tooltipPayload = { ...item, color: donutColors[index % donutColors.length], x: tooltipPoint.x, y: tooltipPoint.y };

          return (
            <g key={item.label}>
              <path
                className="ak-chart__slice"
                d={createArcPath(centerX, centerY, radius, start, end, radius * innerRadiusRatio)}
                onBlur={() => setTooltip(null)}
                onFocus={() => setTooltip(tooltipPayload)}
                onMouseEnter={() => setTooltip(tooltipPayload)}
                onMouseLeave={() => setTooltip(null)}
                style={{ fill: donutColors[index % donutColors.length] }}
                tabIndex={0}
              />
              {showLabels ? (
                <text className="ak-chart__slice-label" x={labelPoint.x} y={labelPoint.y}>
                  {item.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}

import { useState } from "react";
import { ChartFrame } from "../core/ChartFrame";
import type { CartesianChartProps, ChartTooltipPayload } from "../core/types";
import { createLinearScale, defaultChartMargin, getChartArea, getChartCssVariables, getValueExtent, toChartData } from "../utils";

export function BarChart({
  animated = true,
  className,
  colors,
  data = [],
  emptyState,
  height = 260,
  legend = false,
  loading = false,
  loadingState,
  radius = 4,
  renderTooltip,
  showGrid = true,
  showLegend,
  showTooltip = true,
  showXAxis = true,
  showYAxis = false,
  style,
  tooltipStyle,
  width = 640,
  xKey = "label",
  yKey = "value",
}: CartesianChartProps) {
  const [tooltip, setTooltip] = useState<ChartTooltipPayload | null>(null);
  const chartData = toChartData(data, xKey, yKey);
  const area = getChartArea(width, height);
  const values = chartData.map((item) => item.value);
  const yScale = createLinearScale(getValueExtent(values), [area.y + area.height, area.y]);
  const barGap = 10;
  const barWidth = chartData.length > 0 ? Math.max(4, (area.width - barGap * (chartData.length - 1)) / chartData.length) : 0;
  const baseline = yScale.scale(0);
  const empty = chartData.length === 0;
  const chartStyle = { ...getChartCssVariables(colors), ...style };

  return (
    <ChartFrame
      animated={animated}
      className={className}
      empty={empty}
      emptyState={emptyState}
      height={height}
      legend={showLegend ?? legend}
      legendItems={[{ color: colors?.bar ?? colors?.line ?? "var(--ak-color-primary)", label: yKey }]}
      loading={loading}
      loadingState={loadingState}
      renderTooltip={renderTooltip}
      style={chartStyle}
      tooltip={showTooltip ? tooltip : null}
      tooltipStyle={tooltipStyle}
      width={width}
    >
      <svg className="ak-chart__svg" role="img" viewBox={`0 0 ${width} ${height}`}>
        {showGrid
          ? [0, 1, 2, 3].map((line) => {
              const y = area.y + (area.height / 3) * line;
              return <line className="ak-chart__grid-line" key={line} x1={area.x} x2={area.x + area.width} y1={y} y2={y} />;
            })
          : null}
        {chartData.map((item, index) => {
          const x = area.x + index * (barWidth + barGap);
          const y = yScale.scale(Math.max(0, item.value));
          const barHeight = Math.abs(baseline - yScale.scale(item.value));
          const anchorY = item.value >= 0 ? y : baseline + barHeight;
          const tooltipPayload = { ...item, x: x + barWidth / 2, y: anchorY };

          return (
            <g key={item.label}>
              <rect
                className="ak-chart__bar"
                height={barHeight}
                onBlur={() => setTooltip(null)}
                onFocus={() => setTooltip(tooltipPayload)}
                onMouseEnter={() => setTooltip(tooltipPayload)}
                onMouseLeave={() => setTooltip(null)}
                rx={radius}
                tabIndex={0}
                width={barWidth}
                x={x}
                y={item.value >= 0 ? y : baseline}
              />
              {showXAxis ? <text className="ak-chart__axis-label" x={x + barWidth / 2} y={height - defaultChartMargin.bottom / 3}>
                {item.label}
              </text> : null}
            </g>
          );
        })}
        {showYAxis ? (
          <text className="ak-chart__axis-label ak-chart__axis-label--y" x={defaultChartMargin.left / 2} y={area.y + 8}>
            {Math.max(...chartData.map((item) => item.value))}
          </text>
        ) : null}
      </svg>
    </ChartFrame>
  );
}

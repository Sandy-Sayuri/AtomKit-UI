import { useState } from "react";
import { ChartFrame } from "../core/ChartFrame";
import type { CartesianChartProps, ChartTooltipPayload } from "../core/types";
import { createAreaPath, createLinePath, getChartArea, getChartCssVariables, getCoordinates, toChartData } from "../utils";

export function AreaChart({
  animated = true,
  className,
  colors,
  data = [],
  emptyState,
  fill = true,
  height = 260,
  lineWidth = 3,
  legend = false,
  loading = false,
  loadingState,
  renderTooltip,
  showGrid = true,
  showLegend,
  showTooltip = true,
  showXAxis = false,
  showYAxis = false,
  style,
  tooltipStyle,
  width = 640,
  xKey = "label",
  yKey = "value",
}: CartesianChartProps) {
  const [tooltip, setTooltip] = useState<ChartTooltipPayload | null>(null);
  const chartData = toChartData(data, xKey, yKey);
  const points = getCoordinates(chartData, width, height);
  const area = getChartArea(width, height);
  const linePath = createLinePath(points);
  const areaPath = createAreaPath(points, area.y + area.height);
  const empty = chartData.length === 0;
  const chartStyle = {
    ...getChartCssVariables(colors),
    "--ak-chart-line-width": String(lineWidth),
    ...style,
  };

  return (
    <ChartFrame
      animated={animated}
      className={className}
      empty={empty}
      emptyState={emptyState}
      height={height}
      legend={showLegend ?? legend}
      legendItems={[{ color: colors?.line ?? "var(--ak-color-primary)", label: yKey }]}
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
        {fill ? <path className="ak-chart__area" d={areaPath} /> : null}
        <path className="ak-chart__line" d={linePath} />
        {points.map((point) => (
          <circle
            className="ak-chart__point"
            cx={point.x}
            cy={point.y}
            key={`${point.label}-${point.x}`}
            onBlur={() => setTooltip(null)}
            onFocus={() => setTooltip(point)}
            onMouseEnter={() => setTooltip(point)}
            onMouseLeave={() => setTooltip(null)}
            r="4"
            tabIndex={0}
          />
        ))}
        {showXAxis ? points.map((point, index) => (
          <text className="ak-chart__axis-label" key={`${point.label}-${index}`} x={point.x} y={height - 10}>
            {point.label}
          </text>
        )) : null}
        {showYAxis ? (
          <text className="ak-chart__axis-label ak-chart__axis-label--y" x="18" y={area.y + 8}>
            {Math.max(...chartData.map((item) => item.value))}
          </text>
        ) : null}
      </svg>
    </ChartFrame>
  );
}

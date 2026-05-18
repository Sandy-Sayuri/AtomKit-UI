import { useState } from "react";
import { ChartFrame } from "../core/ChartFrame";
import type { CartesianChartProps, ChartTooltipPayload } from "../core/types";
import { createLinePath, defaultChartMargin, getChartArea, getChartCssVariables, getCoordinates, toChartData } from "../utils";

export function LineChart({
  animated = true,
  className,
  colors,
  data = [],
  emptyState,
  height = 260,
  lineWidth = 3,
  legend = false,
  loading = false,
  loadingState,
  showGrid = true,
  showLegend,
  showTooltip = true,
  showXAxis = true,
  showYAxis = false,
  style,
  width = 640,
  xKey = "label",
  yKey = "value",
}: CartesianChartProps) {
  const [tooltip, setTooltip] = useState<ChartTooltipPayload | null>(null);
  const chartData = toChartData(data, xKey, yKey);
  const points = getCoordinates(chartData, width, height);
  const path = createLinePath(points);
  const area = getChartArea(width, height);
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
      style={chartStyle}
      tooltip={showTooltip ? tooltip : null}
    >
      <svg className="ak-chart__svg" role="img" viewBox={`0 0 ${width} ${height}`}>
        {showGrid
          ? [0, 1, 2, 3].map((line) => {
              const y = area.y + (area.height / 3) * line;
              return <line className="ak-chart__grid-line" key={line} x1={area.x} x2={area.x + area.width} y1={y} y2={y} />;
            })
          : null}
        <path className="ak-chart__line" d={path} />
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
          <text className="ak-chart__axis-label" key={`${point.label}-${index}`} x={point.x} y={height - defaultChartMargin.bottom / 3}>
            {point.label}
          </text>
        )) : null}
        {showYAxis ? (
          <text className="ak-chart__axis-label ak-chart__axis-label--y" x={defaultChartMargin.left / 2} y={area.y + 8}>
            {Math.max(...chartData.map((item) => item.value))}
          </text>
        ) : null}
      </svg>
    </ChartFrame>
  );
}

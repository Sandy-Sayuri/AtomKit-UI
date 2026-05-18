import { useState } from "react";
import { ChartFrame } from "../core/ChartFrame";
import type { BaseChartProps, ChartDatum, ChartRecord, ChartTooltipPayload } from "../core/types";
import { createAreaPath, createLinePath, getChartCssVariables, getCoordinates, toChartData } from "../utils";

export interface SparklineProps extends BaseChartProps {
  data: ChartDatum[] | ChartRecord[];
  area?: boolean;
  lineWidth?: number;
  xKey?: string;
  yKey?: string;
  width?: number;
}

export function Sparkline({
  area = false,
  animated = true,
  className,
  colors,
  data,
  emptyState,
  height = 72,
  lineWidth = 2,
  loading = false,
  loadingState,
  showLegend,
  showTooltip = true,
  style,
  width = 240,
  xKey = "label",
  yKey = "value",
}: SparklineProps) {
  const [tooltip, setTooltip] = useState<ChartTooltipPayload | null>(null);
  const margin = { bottom: 4, left: 4, right: 4, top: 4 };
  const chartData = toChartData(data, xKey, yKey);
  const points = getCoordinates(chartData, width, height, margin);
  const linePath = createLinePath(points);
  const areaPath = createAreaPath(points, height - margin.bottom);
  const chartStyle = {
    ...getChartCssVariables(colors),
    "--ak-chart-line-width": String(lineWidth),
    ...style,
  };

  return (
    <ChartFrame
      animated={animated}
      className={className}
      empty={chartData.length === 0}
      emptyState={emptyState}
      height={height}
      loading={loading}
      loadingState={loadingState}
      legend={showLegend}
      legendItems={[{ color: colors?.line ?? "var(--ak-color-primary)", label: yKey }]}
      style={chartStyle}
      tooltip={showTooltip ? tooltip : null}
    >
      <svg className="ak-chart__svg ak-chart__svg--sparkline" role="img" viewBox={`0 0 ${width} ${height}`}>
        {area ? <path className="ak-chart__area" d={areaPath} /> : null}
        <path className="ak-chart__line" d={linePath} />
        {points.map((point) => (
          <circle
            className="ak-chart__point ak-chart__point--silent"
            cx={point.x}
            cy={point.y}
            key={`${point.label}-${point.x}`}
            onMouseEnter={() => setTooltip(point)}
            onMouseLeave={() => setTooltip(null)}
            r="6"
          />
        ))}
      </svg>
    </ChartFrame>
  );
}

import type { CSSProperties, ReactNode } from "react";

export type ChartRecord = Record<string, string | number | null | undefined>;

export interface ChartDatum {
  label: string;
  value: number;
}

export interface ChartPoint extends ChartDatum {
  x: number;
  y: number;
}

export interface ChartSeries {
  color?: string;
  data: ChartDatum[];
  name: string;
}

export interface ChartMargin {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

export interface ChartTooltipPayload {
  color?: string;
  label: string;
  series?: string;
  value: number;
}

export interface ChartColors {
  area?: string;
  axis?: string;
  bar?: string;
  donut?: string[];
  grid?: string;
  line?: string;
  text?: string;
}

export interface BaseChartProps {
  animated?: boolean;
  className?: string;
  colors?: ChartColors;
  emptyState?: ReactNode;
  height?: number;
  hideTooltip?: boolean;
  legend?: boolean;
  loading?: boolean;
  loadingState?: ReactNode;
  showLegend?: boolean;
  showTooltip?: boolean;
  style?: CSSProperties;
  width?: number;
}

export interface CartesianChartProps extends BaseChartProps {
  data?: ChartDatum[] | ChartRecord[];
  fill?: boolean;
  lineWidth?: number;
  radius?: number;
  series?: ChartSeries[];
  showGrid?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  xKey?: string;
  yKey?: string;
}

export interface RadialChartProps extends BaseChartProps {
  data: ChartDatum[] | ChartRecord[];
  innerRadiusRatio?: number;
  labelKey?: string;
  showLabels?: boolean;
  valueKey?: string;
}

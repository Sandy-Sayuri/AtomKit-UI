import { PieChart } from "./PieChart";
import type { RadialChartProps } from "../core/types";

export function DonutChart(props: RadialChartProps) {
  return <PieChart {...props} innerRadiusRatio={props.innerRadiusRatio ?? 0.58} />;
}

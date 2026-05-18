import type { ChartDatum, ChartMargin, ChartPoint, ChartRecord } from "../core/types";
import { createLinearScale, getValueExtent, toNumber } from "./scales";

export const defaultChartMargin: ChartMargin = {
  bottom: 28,
  left: 36,
  right: 16,
  top: 16,
};

export function getChartArea(width: number, height: number, margin: ChartMargin = defaultChartMargin) {
  return {
    height: Math.max(1, height - margin.top - margin.bottom),
    width: Math.max(1, width - margin.left - margin.right),
    x: margin.left,
    y: margin.top,
  };
}

export function getCoordinates(
  data: ChartDatum[],
  width: number,
  height: number,
  margin: ChartMargin = defaultChartMargin,
): ChartPoint[] {
  const area = getChartArea(width, height, margin);
  const values = data.map((item) => item.value);
  const yScale = createLinearScale(getValueExtent(values), [area.y + area.height, area.y]);
  const step = data.length > 1 ? area.width / (data.length - 1) : area.width;

  return data.map((item, index) => ({
    ...item,
    x: area.x + (data.length > 1 ? step * index : area.width / 2),
    y: yScale.scale(item.value),
  }));
}

export function toChartData(data: ChartDatum[] | ChartRecord[] = [], xKey = "label", yKey = "value"): ChartDatum[] {
  return data.map((item, index) => {
    if ("label" in item && "value" in item) {
      return {
        label: String(item.label),
        value: toNumber(item.value),
      };
    }

    return {
      label: String(item[xKey] ?? index + 1),
      value: toNumber(item[yKey]),
    };
  });
}

export function getChartCssVariables(colors?: {
  area?: string;
  axis?: string;
  bar?: string;
  grid?: string;
  line?: string;
  text?: string;
}) {
  return {
    "--ak-chart-area": colors?.area,
    "--ak-chart-axis": colors?.axis,
    "--ak-chart-bar": colors?.bar,
    "--ak-chart-grid": colors?.grid,
    "--ak-chart-line": colors?.line,
    "--ak-chart-text": colors?.text,
  };
}

export function createLinePath(points: ChartPoint[]) {
  if (points.length === 0) {
    return "";
  }

  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
}

export function createAreaPath(points: ChartPoint[], baseline: number) {
  if (points.length === 0) {
    return "";
  }

  const line = createLinePath(points);
  const last = points[points.length - 1];
  const first = points[0];

  return `${line} L ${last.x} ${baseline} L ${first.x} ${baseline} Z`;
}

export function polarToCartesian(centerX: number, centerY: number, radius: number, angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180;

  return {
    x: centerX + radius * Math.cos(radians),
    y: centerY + radius * Math.sin(radians),
  };
}

export function createArcPath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  innerRadius = 0,
) {
  const safeEndAngle = endAngle - startAngle >= 360 ? startAngle + 359.999 : endAngle;
  const start = polarToCartesian(centerX, centerY, radius, safeEndAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);
  const largeArcFlag = safeEndAngle - startAngle <= 180 ? "0" : "1";

  if (innerRadius <= 0) {
    return [
      `M ${centerX} ${centerY}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      "Z",
    ].join(" ");
  }

  const innerStart = polarToCartesian(centerX, centerY, innerRadius, safeEndAngle);
  const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);

  return [
    `M ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

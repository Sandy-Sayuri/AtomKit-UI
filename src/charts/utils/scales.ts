export interface LinearScale {
  domain: [number, number];
  range: [number, number];
  scale: (value: number) => number;
}

export function getValueExtent(values: number[], includeZero = true): [number, number] {
  const safeValues = values.filter(Number.isFinite);
  if (safeValues.length === 0) {
    return [0, 1];
  }

  const min = Math.min(...safeValues);
  const max = Math.max(...safeValues);
  const domainMin = includeZero ? Math.min(0, min) : min;
  const domainMax = includeZero ? Math.max(0, max) : max;

  if (domainMin === domainMax) {
    return [domainMin - 1, domainMax + 1];
  }

  return [domainMin, domainMax];
}

export function createLinearScale(domain: [number, number], range: [number, number]): LinearScale {
  const [domainMin, domainMax] = domain;
  const [rangeMin, rangeMax] = range;
  const domainSize = domainMax - domainMin || 1;

  return {
    domain,
    range,
    scale: (value: number) => rangeMin + ((value - domainMin) / domainSize) * (rangeMax - rangeMin),
  };
}

export function normalizeValue(value: number, min: number, max: number) {
  if (min === max) {
    return 0.5;
  }

  return (value - min) / (max - min);
}

export function toNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : Number(value) || 0;
}

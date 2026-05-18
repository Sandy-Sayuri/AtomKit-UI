import type { ReactNode } from "react";
import type { CSSProperties } from "react";
import type { ChartTooltipPayload } from "./types";

export interface ChartLegendItem {
  color: string;
  label: string;
}

export interface ChartFrameProps {
  children: ReactNode;
  animated?: boolean;
  className?: string;
  empty?: boolean;
  emptyState?: ReactNode;
  height: number;
  legend?: boolean;
  legendItems?: ChartLegendItem[];
  loading?: boolean;
  loadingState?: ReactNode;
  style?: CSSProperties;
  tooltip?: ChartTooltipPayload | null;
}

export function ChartFrame({
  children,
  animated = true,
  className = "",
  empty = false,
  emptyState = "Sem dados para exibir.",
  height,
  legend = false,
  legendItems = [],
  loading = false,
  loadingState = "Carregando grafico...",
  style,
  tooltip,
}: ChartFrameProps) {
  const classes = ["ak-chart", className].filter(Boolean).join(" ");

  return (
    <div className={classes} data-animated={animated} style={style}>
      <div className="ak-chart__surface" style={{ minHeight: height }}>
        {loading || empty ? <div className="ak-chart__state">{loading ? loadingState : emptyState}</div> : children}
        {tooltip ? (
          <div className="ak-chart__tooltip" role="status">
            <span className="ak-chart__tooltip-label">{tooltip.series ?? tooltip.label}</span>
            <strong>{tooltip.value}</strong>
          </div>
        ) : null}
      </div>
      {legend && legendItems.length > 0 ? (
        <div className="ak-chart__legend">
          {legendItems.map((item) => (
            <span className="ak-chart__legend-item" key={item.label}>
              <span className="ak-chart__legend-swatch" style={{ background: item.color }} />
              {item.label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

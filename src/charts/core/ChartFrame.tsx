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
  renderTooltip?: (payload: ChartTooltipPayload) => ReactNode;
  style?: CSSProperties;
  tooltip?: ChartTooltipPayload | null;
  tooltipStyle?: CSSProperties;
  width: number;
}

function getTooltipPosition(tooltip: ChartTooltipPayload, width: number, height: number) {
  const x = tooltip.x ?? width / 2;
  const y = tooltip.y ?? height / 2;
  const horizontalEdge = Math.max(56, width * 0.16);
  const verticalEdge = Math.max(44, height * 0.18);
  const align = x < horizontalEdge ? "start" : x > width - horizontalEdge ? "end" : "center";
  const side = y < verticalEdge ? "bottom" : "top";

  return {
    align,
    side,
    style: {
      left: `${(x / width) * 100}%`,
      top: `${(y / height) * 100}%`,
    } satisfies CSSProperties,
  };
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
  renderTooltip,
  style,
  tooltip,
  tooltipStyle,
  width,
}: ChartFrameProps) {
  const classes = ["ak-chart", className].filter(Boolean).join(" ");
  const tooltipPosition = tooltip ? getTooltipPosition(tooltip, width, height) : null;

  return (
    <div className={classes} data-animated={animated} style={style}>
      <div className="ak-chart__surface" style={{ minHeight: height }}>
        {loading || empty ? <div className="ak-chart__state">{loading ? loadingState : emptyState}</div> : children}
        {tooltip && tooltipPosition ? (
          <div
            className="ak-chart__tooltip"
            data-align={tooltipPosition.align}
            data-side={tooltipPosition.side}
            role="status"
            style={{ ...tooltipPosition.style, ...tooltipStyle }}
          >
            {renderTooltip ? (
              renderTooltip(tooltip)
            ) : (
              <>
                <span className="ak-chart__tooltip-label">{tooltip.series ?? tooltip.label}</span>
                <strong>{tooltip.value}</strong>
              </>
            )}
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

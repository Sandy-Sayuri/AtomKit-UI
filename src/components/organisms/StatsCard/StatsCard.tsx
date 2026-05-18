import type { HTMLAttributes, ReactNode } from "react";
import { Card } from "../Card";

export interface StatsCardProps extends HTMLAttributes<HTMLElement> {
  description?: ReactNode;
  icon?: ReactNode;
  label: ReactNode;
  trend?: ReactNode;
  value: ReactNode;
}

export function StatsCard({ className = "", description, icon, label, trend, value, ...props }: StatsCardProps) {
  return (
    <Card className={["ak-stats-card", className].filter(Boolean).join(" ")} {...props}>
      <div className="ak-stats-card__header">
        <span className="ak-stats-card__label">{label}</span>
        {icon ? <span className="ak-icon ak-stats-card__icon">{icon}</span> : null}
      </div>
      <div className="ak-stats-card__value">{value}</div>
      {description || trend ? (
        <div className="ak-stats-card__footer">
          {description ? <span>{description}</span> : null}
          {trend ? <strong>{trend}</strong> : null}
        </div>
      ) : null}
    </Card>
  );
}

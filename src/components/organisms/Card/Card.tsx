import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type CardVariant = "elevated" | "outlined" | "ghost";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  actions?: ReactNode;
  children: ReactNode;
  description?: string;
  footer?: ReactNode;
  icon?: ReactNode;
  padding?: string;
  title?: string;
  variant?: CardVariant;
}

export function Card({
  children,
  actions,
  className = "",
  description,
  footer,
  icon,
  padding,
  style,
  title,
  variant = "elevated",
  ...props
}: CardProps) {
  const classes = ["ak-card", `ak-card--${variant}`, className].filter(Boolean).join(" ");
  const cardStyle = padding ? ({ ...style, "--ak-card-padding": padding } as CSSProperties) : style;

  return (
    <article className={classes} style={cardStyle} {...props}>
      {title || description ? (
        <header className="ak-card__header">
          <div className="ak-card__header-row">
            <div className="ak-card__heading">
              {icon ? <span className="ak-icon ak-card__icon">{icon}</span> : null}
              <div>
                {title ? <h2 className="ak-card__title">{title}</h2> : null}
                {description ? <p className="ak-card__description">{description}</p> : null}
              </div>
            </div>
            {actions ? <div className="ak-card__actions">{actions}</div> : null}
          </div>
        </header>
      ) : null}
      <div className="ak-card__content">{children}</div>
      {footer ? <footer className="ak-card__footer">{footer}</footer> : null}
    </article>
  );
}

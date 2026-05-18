import type { HTMLAttributes, ReactNode } from "react";
import { Button } from "../../atoms/Button";
import type { ButtonProps } from "../../atoms/Button";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  action?: Pick<ButtonProps, "children" | "iconLeft" | "iconRight" | "onClick" | "variant">;
  description?: ReactNode;
  icon?: ReactNode;
  title: ReactNode;
}

export function EmptyState({ action, className = "", description, icon, title, ...props }: EmptyStateProps) {
  const classes = ["ak-empty-state", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      {icon ? <span className="ak-icon ak-empty-state__icon">{icon}</span> : null}
      <div className="ak-empty-state__title">{title}</div>
      {description ? <div className="ak-empty-state__description">{description}</div> : null}
      {action ? <Button {...action}>{action.children}</Button> : null}
    </div>
  );
}

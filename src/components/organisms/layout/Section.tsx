import type { HTMLAttributes, ReactNode } from "react";

export interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  actions?: ReactNode;
  children: ReactNode;
  description?: ReactNode;
  title?: ReactNode;
}

export function Section({ actions, children, className = "", description, title, ...props }: SectionProps) {
  return (
    <section className={["ak-section", className].filter(Boolean).join(" ")} {...props}>
      {title || description || actions ? (
        <header className="ak-section__header">
          <div>
            {title ? <h2 className="ak-section__title">{title}</h2> : null}
            {description ? <p className="ak-section__description">{description}</p> : null}
          </div>
          {actions ? <div className="ak-section__actions">{actions}</div> : null}
        </header>
      ) : null}
      <div className="ak-section__content">{children}</div>
    </section>
  );
}

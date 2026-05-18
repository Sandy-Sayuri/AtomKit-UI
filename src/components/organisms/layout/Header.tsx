import type { HTMLAttributes, ReactNode } from "react";

export interface HeaderProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  actions?: ReactNode;
  fixed?: boolean;
  logo?: ReactNode;
  menu?: ReactNode;
  title?: ReactNode;
  transparent?: boolean;
}

export function Header({ actions, className = "", fixed = false, logo, menu, title, transparent = false, ...props }: HeaderProps) {
  const classes = [
    "ak-header",
    fixed ? "ak-header--fixed" : "",
    transparent ? "ak-header--transparent" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classes} {...props}>
      <div className="ak-header__brand">
        {logo ? <div className="ak-header__logo">{logo}</div> : null}
        {title ? <div className="ak-header__title">{title}</div> : null}
      </div>
      {menu ? <div className="ak-header__menu">{menu}</div> : null}
      {actions ? <div className="ak-header__actions">{actions}</div> : null}
    </header>
  );
}

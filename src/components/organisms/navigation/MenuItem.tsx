import type { MenuItemData } from "./types";

export interface MenuItemProps<TRole extends string = string> extends MenuItemData<TRole> {
  active?: boolean;
  hasChildren?: boolean;
}

export function MenuItem<TRole extends string = string>({
  active = false,
  badge,
  disabled = false,
  hasChildren = false,
  href,
  icon,
  label,
  onClick,
}: MenuItemProps<TRole>) {
  const content = (
    <>
      {icon ? <span className="ak-icon ak-menu__icon">{icon}</span> : null}
      <span className="ak-menu__label">{label}</span>
      {badge ? <span className="ak-menu__badge">{badge}</span> : null}
      {hasChildren ? <span className="ak-menu__chevron">v</span> : null}
    </>
  );
  const className = ["ak-menu__item", active ? "ak-menu__item--active" : "", disabled ? "ak-menu__item--disabled" : ""]
    .filter(Boolean)
    .join(" ");

  if (href && !disabled) {
    return (
      <a className={className} href={href} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button className={className} disabled={disabled} onClick={onClick} type="button">
      {content}
    </button>
  );
}

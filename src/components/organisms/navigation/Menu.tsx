import type { ReactNode } from "react";
import { MenuItem } from "./MenuItem";
import { filterMenuItemsByRole, getMenuItemId, type MenuItemData, type MenuOrientation } from "./types";

export interface MenuProps<TRole extends string = string> {
  activeItem?: string;
  currentRole?: TRole;
  items: Array<MenuItemData<TRole>>;
  orientation?: MenuOrientation;
  renderItem?: (item: MenuItemData<TRole>, active: boolean) => ReactNode;
}

function renderItems<TRole extends string = string>(
  items: Array<MenuItemData<TRole>>,
  activeItem?: string,
  renderItem?: (item: MenuItemData<TRole>, active: boolean) => ReactNode,
) {
  return items.map((item) => {
    const id = getMenuItemId(item);
    const active = id === activeItem || item.href === activeItem;
    const hasChildren = Boolean(item.children?.length);

    return (
      <li className="ak-menu__node" key={id || String(item.label)}>
        {renderItem ? renderItem(item, active) : <MenuItem {...item} active={active} hasChildren={hasChildren} />}
        {hasChildren ? <ul className="ak-menu__nested">{renderItems(item.children ?? [], activeItem, renderItem)}</ul> : null}
      </li>
    );
  });
}

export function Menu<TRole extends string = string>({
  activeItem,
  currentRole,
  items,
  orientation = "vertical",
  renderItem,
}: MenuProps<TRole>) {
  const visibleItems = filterMenuItemsByRole(items, currentRole);

  return (
    <nav className={`ak-menu ak-menu--${orientation}`}>
      <ul className="ak-menu__list">{renderItems(visibleItems, activeItem, renderItem)}</ul>
    </nav>
  );
}

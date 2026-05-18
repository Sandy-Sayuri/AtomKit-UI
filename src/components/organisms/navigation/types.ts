import type { ReactNode } from "react";

export interface MenuItemData<TRole extends string = string> {
  badge?: ReactNode;
  children?: Array<MenuItemData<TRole>>;
  disabled?: boolean;
  href?: string;
  icon?: ReactNode;
  id?: string;
  label: ReactNode;
  onClick?: () => void;
  roles?: TRole[];
}

export type MenuOrientation = "horizontal" | "vertical";

export function getMenuItemId<TRole extends string = string>(item: MenuItemData<TRole>) {
  return item.id ?? (typeof item.label === "string" ? item.label : item.href ?? "");
}

export function filterMenuItemsByRole<TRole extends string = string>(
  items: Array<MenuItemData<TRole>>,
  currentRole?: TRole,
): Array<MenuItemData<TRole>> {
  return items
    .filter((item) => !item.roles || (currentRole ? item.roles.includes(currentRole) : false))
    .map((item) => ({
      ...item,
      children: item.children ? filterMenuItemsByRole(item.children, currentRole) : undefined,
    }));
}

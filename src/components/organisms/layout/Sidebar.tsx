import type { CSSProperties, ReactNode } from "react";
import { Menu } from "../navigation";
import type { MenuItemData } from "../navigation";

export interface SidebarProps<TRole extends string = string> {
  children?: ReactNode;
  collapsed?: boolean;
  collapsible?: boolean;
  currentRole?: TRole;
  footer?: ReactNode;
  items?: Array<MenuItemData<TRole>>;
  profileSlot?: ReactNode;
  width?: number | string;
}

export function Sidebar<TRole extends string = string>({
  children,
  collapsed = false,
  collapsible = false,
  currentRole,
  footer,
  items = [],
  profileSlot,
  width = 260,
}: SidebarProps<TRole>) {
  const sidebarWidth = typeof width === "number" ? `${width}px` : width;

  return (
    <aside
      className={["ak-sidebar", collapsed ? "ak-sidebar--collapsed" : "", collapsible ? "ak-sidebar--collapsible" : ""]
        .filter(Boolean)
        .join(" ")}
      style={{ "--ak-sidebar-width": sidebarWidth } as CSSProperties}
    >
      {profileSlot ? <div className="ak-sidebar__profile">{profileSlot}</div> : null}
      {children ?? <Menu currentRole={currentRole} items={items} />}
      {footer ? <div className="ak-sidebar__footer">{footer}</div> : null}
    </aside>
  );
}

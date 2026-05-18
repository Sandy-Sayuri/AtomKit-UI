import { useState, type ReactNode } from "react";
import { Menu } from "./Menu";
import type { MenuItemData } from "./types";

export interface DropdownMenuProps<TRole extends string = string> {
  currentRole?: TRole;
  items: Array<MenuItemData<TRole>>;
  trigger: ReactNode;
}

export function DropdownMenu<TRole extends string = string>({ currentRole, items, trigger }: DropdownMenuProps<TRole>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="ak-dropdown-menu">
      <button className="ak-dropdown-menu__trigger" onClick={() => setOpen((value) => !value)} type="button">
        {trigger}
      </button>
      {open ? (
        <div className="ak-dropdown-menu__content">
          <Menu currentRole={currentRole} items={items} />
        </div>
      ) : null}
    </div>
  );
}

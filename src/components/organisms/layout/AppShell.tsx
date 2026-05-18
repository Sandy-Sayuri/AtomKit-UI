import type { ReactNode } from "react";

export interface AppShellProps {
  children: ReactNode;
  footer?: ReactNode;
  fullHeight?: boolean;
  header?: ReactNode;
  layout?: "default" | "sidebar" | "dashboard";
  sidebar?: ReactNode;
  sidebarPosition?: "left" | "right";
}

export function AppShell({
  children,
  footer,
  fullHeight = false,
  header,
  layout = "default",
  sidebar,
  sidebarPosition = "left",
}: AppShellProps) {
  const classes = [
    "ak-app-shell",
    `ak-app-shell--${layout}`,
    `ak-app-shell--sidebar-${sidebarPosition}`,
    fullHeight ? "ak-app-shell--full-height" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {header ? <div className="ak-app-shell__header">{header}</div> : null}
      <div className="ak-app-shell__body">
        {sidebar ? <div className="ak-app-shell__sidebar">{sidebar}</div> : null}
        <main className="ak-app-shell__main">{children}</main>
      </div>
      {footer ? <div className="ak-app-shell__footer">{footer}</div> : null}
    </div>
  );
}

import type { ReactNode } from "react";

export interface RenderByRoleProps<TRole extends string = string> {
  allowedRoles: TRole[];
  children: ReactNode;
  currentRole?: TRole;
  fallback?: ReactNode;
}

export function RenderByRole<TRole extends string = string>({
  allowedRoles,
  children,
  currentRole,
  fallback = null,
}: RenderByRoleProps<TRole>) {
  return currentRole && allowedRoles.includes(currentRole) ? <>{children}</> : <>{fallback}</>;
}

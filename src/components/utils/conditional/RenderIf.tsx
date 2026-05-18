import type { ReactNode } from "react";

export interface RenderIfProps {
  children: ReactNode;
  condition: boolean;
  fallback?: ReactNode;
}

export function RenderIf({ children, condition, fallback = null }: RenderIfProps) {
  return condition ? <>{children}</> : <>{fallback}</>;
}

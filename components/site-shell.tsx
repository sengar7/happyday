import type { ReactNode } from "react";

type SiteShellProps = Readonly<{
  children: ReactNode;
}>;

/** Shared document shell for every future page and immersive section. */
export function SiteShell({ children }: SiteShellProps) {
  return <div className="isolate min-h-dvh overflow-x-clip">{children}</div>;
}

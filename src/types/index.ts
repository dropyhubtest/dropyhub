import type { ReactNode } from "react";

export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
}

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

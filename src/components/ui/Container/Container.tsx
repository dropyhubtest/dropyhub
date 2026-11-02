import React from "react";
import styles from "./Container.module.css";
import { cn } from "@/lib/utils";
import type { BaseComponentProps } from "@/types";

export interface ContainerProps extends BaseComponentProps {
  size?: "default" | "narrow";
  as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = "default",
  as: Component = "div",
}) => {
  return (
    <Component
      className={cn(
        styles.container,
        size === "narrow" && styles.narrow,
        className
      )}
    >
      {children}
    </Component>
  );
};

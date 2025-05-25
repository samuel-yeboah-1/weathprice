import React from "react";
import { cn } from "@/lib/utils";
export function Spinner({ className, variant = "primary", size = "default", ...props }) {
  const variants = {
    primary: "border-t-primary",
    secondary: "border-t-secondary",
    white: "border-t-white",
  };

  const sizes = {
    default: "h-4 w-4",
    sm: "h-3 w-3",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-gray-300",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

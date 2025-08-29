import React from "react";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default",
  size = "sm",
  children,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center rounded-full font-medium transition-colors";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800",
    success: "bg-gradient-to-r from-success-100 to-success-200 text-success-800",
    accent: "bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800",
    cold: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800",
    hot: "bg-gradient-to-r from-red-100 to-red-200 text-red-800",
    estimate: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800",
    closed: "bg-gradient-to-r from-green-100 to-green-200 text-green-800"
  };
  
  const sizes = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-sm"
  };

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;
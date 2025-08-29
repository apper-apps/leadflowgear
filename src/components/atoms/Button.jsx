import React from "react";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  children, 
  className, 
  variant = "primary", 
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:from-primary-600 hover:to-primary-700 hover:shadow-xl focus:ring-primary-500 transform hover:scale-105",
    secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 border border-gray-300 hover:from-gray-200 hover:to-gray-300 focus:ring-gray-500 transform hover:scale-105",
    success: "bg-gradient-to-r from-success-500 to-success-600 text-white shadow-lg hover:from-success-600 hover:to-success-700 hover:shadow-xl focus:ring-success-500 transform hover:scale-105",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg hover:from-accent-600 hover:to-accent-700 hover:shadow-xl focus:ring-accent-500 transform hover:scale-105",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    linkedin: "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:from-primary-600 hover:to-primary-700 hover:shadow-xl focus:ring-primary-500"
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        loading && "cursor-wait",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          className="w-4 h-4 mr-2 animate-spin" 
        />
      )}
      {!loading && icon && iconPosition === "left" && (
        <ApperIcon 
          name={icon} 
          className="w-4 h-4 mr-2" 
        />
      )}
      {children}
      {!loading && icon && iconPosition === "right" && (
        <ApperIcon 
          name={icon} 
          className="w-4 h-4 ml-2" 
        />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
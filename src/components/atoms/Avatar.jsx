import React, { useState } from "react";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Avatar = forwardRef(({ 
  className, 
  src,
  alt = "",
  size = "md",
  fallback,
  ...props 
}, ref) => {
  const [imageError, setImageError] = useState(false);
  
  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
    "2xl": "w-20 h-20 text-2xl"
  };

  const baseStyles = "relative inline-flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200";

  if (src && !imageError) {
    return (
      <div
        ref={ref}
        className={cn(baseStyles, sizes[size], className)}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(baseStyles, sizes[size], className)}
      {...props}
    >
      {fallback ? (
        <span className="font-medium text-primary-700">
          {fallback}
        </span>
      ) : (
        <ApperIcon 
          name="User" 
          className="w-1/2 h-1/2 text-primary-600"
        />
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;
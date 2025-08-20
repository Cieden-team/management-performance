"use client";

import { User } from "lucide-react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10", 
  lg: "w-12 h-12",
  xl: "w-16 h-16"
};

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6", 
  xl: "w-8 h-8"
};

const Avatar = ({ src, alt = "Avatar", size = "md", className = "" }: AvatarProps) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} ${className} rounded-full object-cover`}
      />
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${className} bg-[#e9e9e9] dark:bg-[#373737] rounded-full flex items-center justify-center`}>
      <User className={`${iconSizes[size]} text-[#646464] dark:text-[#909090]`} />
    </div>
  );
};

export default Avatar;

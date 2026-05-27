"use client";

import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "dark" | "ghost" | "muted" | "danger";
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const base = "px-4 py-2 rounded cursor-pointer";
  const variants: Record<string, string> = {
    primary: "bg-green-600 text-white",
    dark: "bg-gray-900 text-white",
    ghost: "bg-transparent",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

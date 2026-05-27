"use client";

import React from "react";

export default function Heading({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <h1 className={`text-2xl font-semibold ${className}`}>{children}</h1>;
}

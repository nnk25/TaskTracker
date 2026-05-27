"use client";

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className = "",
  ...props
}: Readonly<InputProps>) {
  return <input className={className} {...props} />;
}

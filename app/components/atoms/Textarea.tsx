"use client";

import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({
  className = "",
  ...props
}: Readonly<TextareaProps>) {
  return <textarea className={className} {...props} />;
}

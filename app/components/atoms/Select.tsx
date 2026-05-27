"use client"

import React from 'react'

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export default function Select({ className = '', children, ...props }: SelectProps) {
  return (
    <select className={className} {...props}>
      {children}
    </select>
  )
}

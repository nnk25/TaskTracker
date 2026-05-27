import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'danger' | 'muted'
  className?: string
}

export default function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const base = 'px-3 py-1 rounded'
  const variantCls =
    variant === 'primary' ? 'bg-blue-600 text-white' : variant === 'danger' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'
  return (
    <button className={`${base} ${variantCls} ${className}`} {...rest}>
      {children}
    </button>
  )
}

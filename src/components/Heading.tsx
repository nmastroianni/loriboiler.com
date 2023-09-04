import { cn } from '@/utils/cn'
import React, { HTMLAttributes } from 'react'

interface HeadingProps extends HTMLAttributes<HTMLHeadElement> {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size: 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  className?: string
  children: React.ReactNode
}

export default function Heading({
  as: Comp,
  size,
  children,
  className,
  ...restProps
}: HeadingProps) {
  return (
    <Comp
      className={cn('font-playfair font-bold', {
        'text-7xl leading-[6rem]': size === '7xl',
        'text-6xl leading-[5rem]': size === '6xl',
        'text-5xl leading-[4rem]': size === '5xl',
        'text-4xl leading-[3rem]': size === '4xl',
        'text-3xl': size === '3xl',
        'text-2xl': size === '2xl',
        'text-xl': size === 'xl',
      })}
      {...restProps}
    >
      {children}
    </Comp>
  )
}

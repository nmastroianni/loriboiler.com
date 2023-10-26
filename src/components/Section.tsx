import React from 'react'
import { cn } from '@/lib/utils/cn'

type SectionProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  width?: 'full' | '2xl' | 'xl' | 'lg' | 'md'
}

export default function Section({
  as: Comp = 'section',
  width = 'full',
  className,
  children,
  ...restProps
}: SectionProps) {
  return (
    <Comp
      className={cn(
        'flex items-center px-4 py-2 md:px-6 md:py-8 lg:py-10',
        className,
      )}
      {...restProps}
    >
      <div
        className={cn('mx-auto w-full', {
          'w-full': width === 'full',
          'max-w-screen-2xl': width === '2xl',
          'max-w-screen-xl': width === 'xl',
          'max-w-screen-lg': width === 'lg',
          'max-w-screen-md': width === 'md',
        })}
      >
        {children}
      </div>
    </Comp>
  )
}

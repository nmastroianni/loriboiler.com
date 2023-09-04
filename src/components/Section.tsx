import React from 'react'
import { cn } from '@/utils/cn'

type SectionProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  width?: 'full' | '2xl' | 'xl' | 'lg'
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
        'px-4 py-10 md:py-14 md:px-6 lg:py-16 flex items-center',
        className,
      )}
      {...restProps}
    >
      <div
        className={cn('w-full mx-auto', {
          'w-full': width === 'full',
          'max-w-screen-2xl': width === '2xl',
          'max-w-screen-xl': width === 'xl',
          'max-w-screen-lg': width === 'lg',
        })}
      >
        {children}
      </div>
    </Comp>
  )
}

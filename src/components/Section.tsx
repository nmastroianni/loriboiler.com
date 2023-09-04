import React from 'react'
import clsx from 'clsx'

type SectionProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}

export default function Section({
  as: Comp = 'section',
  className,
  children,
  ...restProps
}: SectionProps) {
  return (
    <Comp
      className={clsx(
        'px-4 py-10 md:py-14 md:px-6 lg:py-16 flex items-center',
        className,
      )}
      {...restProps}
    >
      <div className="mx-auto max-w-screen-lg">{children}</div>
    </Comp>
  )
}

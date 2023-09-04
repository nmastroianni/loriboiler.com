import { PrismicNextLink, PrismicNextLinkProps } from '@prismicio/next'
import { cn } from '@/utils/cn'

export default function Button({
  className,
  color,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={cn(
        'px-6 py-4 font-bold lg:text-lg rounded-xl',
        {
          'bg-color-primary text-color-base': color === 'primary',
          'bg-color-secondary text-color-base': color === 'secondary',
          'bg-color-accent text-color-neutral': color === 'accent',
          'bg-color-neutral text-color-accent': color === 'secondary',
        },
        className,
      )}
      {...restProps}
    />
  )
}

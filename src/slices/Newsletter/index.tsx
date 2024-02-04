import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Section from '@/components/Section'
import { cn } from '@/lib/utils/cn'
import { PrismicRichText } from '@/components/PrismicRichText'
import NewsletterForm from '@/components/NewsletterForm'

/**
 * Props for `Newsletter`.
 */
export type NewsletterProps = SliceComponentProps<Content.NewsletterSlice>

/**
 * Component for "Newsletter" Slices.
 */
const Newsletter = ({ slice }: NewsletterProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="xl"
    >
      <div className="mx-auto my-4 grid max-w-screen-xl px-4 md:my-6 md:gap-x-4 lg:my-8 lg:grid-cols-2 xl:my-10">
        <div
          className={cn('prose mx-auto lg:prose-lg xl:prose-xl', {
            'order-last': !slice.primary.form_location,
          })}
        >
          <PrismicRichText field={slice.primary.title} />
          <PrismicRichText field={slice.primary.description} />
        </div>
        <NewsletterForm {...slice} />
      </div>
    </Section>
  )
}

export default Newsletter

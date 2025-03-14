import { Content as PrismicContent } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Section from '@/components/Section'
import { PrismicRichText } from '@/components/PrismicRichText'
import { JSX } from 'react'
/**
 * Props for `Content`.
 */
export type ContentProps = SliceComponentProps<PrismicContent.ContentSlice>

/**
 * Component for "Content" Slices.
 */
const Content = ({ slice }: ContentProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="lg"
    >
      <div className="prose lg:prose-lg mx-auto">
        <PrismicRichText field={slice.primary.content} />
      </div>
    </Section>
  )
}

export default Content

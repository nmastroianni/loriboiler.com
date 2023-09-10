import { createClient } from '@/prismicio'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Slider from '@/components/Slider'
import { TestimonialDocument } from '../../../prismicio-types'

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>

/**
 * Component for "Carousel" Slices.
 */
const Carousel = async ({ slice }: CarouselProps): Promise<JSX.Element> => {
  const client = createClient()
  const testimonials = await Promise.all(
    slice.items.map(item => {
      if (
        isFilled.contentRelationship(item.testimonial) &&
        item.testimonial.uid &&
        slice.variation === 'default'
      ) {
        return client.getByUID('testimonial', item.testimonial.uid)
      }
      return undefined
    }),
  )
  // Filter out the undefined values from the testimonials array.
  const filteredTestimonials = testimonials.filter(
    (testimonial): testimonial is TestimonialDocument => !!testimonial,
  )
  return (
    <>
      <Slider testimonials={filteredTestimonials} />
      Placeholder component for carousel (variation: {slice.variation}) Slices
    </>
  )
}

export default Carousel

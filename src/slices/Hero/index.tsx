import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Section from '@/components/Section'
import { cn } from '@/lib/utils/cn'
import { PrismicRichText } from '@/components/PrismicRichText'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { Button } from '@/components/ui/button'

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice, index }: HeroProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative lg:h-[calc(100vh-161px)]"
    >
      <PrismicNextImage
        field={slice.primary.background_image}
        fallbackAlt=""
        fill
        sizes="80vw"
        className="z-[-2] hidden object-cover lg:block"
        priority={index === 0}
      />
      <div
        className={cn('flex items-center justify-center lg:justify-end', {
          'lg:justify-start': slice.primary.image_location,
        })}
      >
        <div
          className={cn(
            'from-accent via-background to-foreground lg:via-background lg:to-background absolute inset-0 z-[-1] bg-gradient-to-b lg:bg-gradient-to-l lg:from-transparent',
            {
              'lg:via-background lg:to-background lg:bg-gradient-to-r lg:from-transparent':
                !slice.primary.image_location,
            },
          )}
        />

        <div className="lg:w-1/2">
          <div className="mx-auto grid max-w-lg">
            <PrismicRichText field={slice.primary.heading} />
            <PrismicRichText field={slice.primary.description} />
            {isFilled.link(slice.primary.button_link) &&
              isFilled.keyText(slice.primary.button_text) && (
                <Button
                  variant="default"
                  size="lg"
                  className="my-6 place-self-center"
                  asChild
                >
                  <PrismicNextLink field={slice.primary.button_link}>
                    {slice.primary.button_text}
                  </PrismicNextLink>
                </Button>
              )}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Hero

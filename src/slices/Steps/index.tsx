import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import Section from '@/components/Section'
import { PrismicRichText } from '@/components/PrismicRichText'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'
import { JSX, ReactNode } from 'react'
/**
 * Props for `Steps`.
 */
export type StepsProps = SliceComponentProps<Content.StepsSlice>

/**
 * Component for "Steps" Slices.
 */
const Steps = ({ slice, index }: StepsProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="full"
      className="bg-muted relative px-0 py-0 md:px-0 md:py-0 lg:py-0"
    >
      <div className="relative">
        <PrismicNextImage
          field={slice.primary.background_image}
          fallbackAlt=""
          fill
          sizes="70vw"
          className="hidden object-cover opacity-0 lg:block lg:opacity-100"
          priority={index === 0}
        />
        <Section width="xl">
          {slice?.items?.length && (
            <div
              className={cn('grid gap-y-16 py-12 lg:gap-x-6', {
                'lg:grid-cols-3':
                  slice.items.length === 3 || slice.items.length === 6,
                'lg:grid-cols-2':
                  slice.items.length === 2 || slice.items.length === 4,
              })}
            >
              {slice.items.map((item, i) => {
                if (slice.id) {
                  return (
                    <div
                      key={slice.id + i}
                      className="bg-background/95 relative flex flex-col gap-y-8 rounded-lg border-1 px-6 py-12 shadow-xs"
                    >
                      <div className="bg-secondary font-playfair text-color-base shadow-color-secondary absolute -top-10 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full text-4xl shadow-md">
                        <span className="-mt-2">
                          {item.step_sequence_override
                            ? item.step_sequence_override
                            : i + 1}
                        </span>
                      </div>
                      <div className="text-center">
                        <PrismicRichText
                          field={item.step_title}
                          components={{
                            heading3: ({
                              children,
                            }: {
                              children: ReactNode
                            }) => (
                              <h3 className="text-muted font-playfair text-3xl font-bold">
                                {children}
                              </h3>
                            ),
                          }}
                        />
                      </div>
                      <PrismicRichText field={item.step_text} />
                      {isFilled.link(item.link) &&
                        isFilled.keyText(item.link_text) && (
                          <div className="text-center">
                            <Button
                              asChild
                              color="accent"
                              variant="default"
                              size="lg"
                            >
                              <PrismicNextLink field={item.link}>
                                {item.link_text}
                              </PrismicNextLink>
                            </Button>
                          </div>
                        )}
                    </div>
                  )
                }
              })}
            </div>
          )}
        </Section>
      </div>
    </Section>
  )
}

export default Steps

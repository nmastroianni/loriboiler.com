import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import Section from '@/components/Section'
import { PrismicRichText } from '@/components/PrismicRichText'
import Button from '@/components/Button'
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
      width="xl"
      className="relative"
    >
      <PrismicNextImage
        field={slice.primary.background_image}
        fallbackAlt=""
        fill
        sizes="100vw"
        className="z-[-2] object-cover lg:block"
        priority={index === 0}
      />
      {slice?.items?.length && (
        <div className="grid gap-6 py-12 lg:grid-cols-3">
          {slice.items.map((item, i) => {
            if (slice.id) {
              return (
                <div
                  key={slice.id + i}
                  className="border-1 relative flex flex-col gap-y-8 rounded-lg bg-color-base bg-opacity-50 px-6 py-12 shadow-sm shadow-color-neutral"
                >
                  <div className="absolute -top-10 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-color-secondary font-playfair text-4xl text-color-base shadow-md shadow-color-secondary">
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
                        heading3: ({ children }) => (
                          <h3 className="font-playfair text-3xl font-bold">
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
                        <Button field={item.link} color="accent">
                          {item.link_text}
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
  )
}

export default Steps

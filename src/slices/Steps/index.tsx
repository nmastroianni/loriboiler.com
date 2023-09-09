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
        <div className="grid lg:grid-cols-3 gap-6 py-12">
          {slice.items.map((item, i) => {
            if (slice.id) {
              return (
                <div
                  key={slice.id + i}
                  className="border-1 bg-color-base bg-opacity-50 relative rounded-lg py-12 px-6 flex flex-col gap-y-8 shadow-sm shadow-color-neutral"
                >
                  <div className="w-16 h-16 bg-color-secondary text-color-base rounded-full absolute left-1/2 -translate-x-1/2 -top-10 flex justify-center items-center font-playfair text-4xl shadow-md shadow-color-secondary">
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
                          <h3 className="text-3xl font-playfair font-bold">
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

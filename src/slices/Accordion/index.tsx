import { PrismicRichText } from '@/components/PrismicRichText'
import Section from '@/components/Section'
import {
  Accordion as UiAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'
import { JSX, ReactNode } from 'react'

/**
 * Props for `Accordion`.
 */
export type AccordionProps = SliceComponentProps<Content.AccordionSlice>

/**
 * Component for "Accordion" Slices.
 */
const Accordion = ({ slice }: AccordionProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="md"
      className="text-foreground"
    >
      {isFilled.richText(slice.primary.title) && (
        <>
          <PrismicRichText field={slice.primary.title} />
          <hr className="my-4" />
        </>
      )}
      {isFilled.group(slice.primary.accordion_items) && (
        <UiAccordion
          type="single"
          className="prose mx-auto max-w-(--breakpoint-sm)"
          collapsible
          defaultValue="item-0"
        >
          {slice.primary.accordion_items.map((item, index) => {
            if (
              isFilled.keyText(item.heading) &&
              isFilled.richText(item.content)
            ) {
              return (
                <AccordionItem key={slice.id + index} value={`item-${index}`}>
                  <AccordionTrigger className="font-semibold">
                    {item.heading}
                  </AccordionTrigger>
                  <AccordionContent className="prose-p:my-2 prose-a:no-underline">
                    <PrismicRichText
                      field={item.content}
                      components={{
                        paragraph: ({ children }: { children: ReactNode }) => (
                          <p className="prose lg:prose-lg">{children}</p>
                        ),
                      }}
                    />
                    {isFilled.link(item.link) &&
                      isFilled.keyText(item.button_label) && (
                        <div className="flex justify-center py-2 lg:justify-start">
                          <Button
                            asChild
                            variant={item.button_variant}
                            className="text-xs lg:text-sm"
                          >
                            <PrismicNextLink field={item.link}>
                              {item.button_label}
                            </PrismicNextLink>
                          </Button>
                        </div>
                      )}
                  </AccordionContent>
                </AccordionItem>
              )
            }
            return null
          })}
        </UiAccordion>
      )}
    </Section>
  )
}

export default Accordion

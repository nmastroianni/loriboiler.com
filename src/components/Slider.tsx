'use client'
import Section from '@/components/Section'
import { CarouselSlice, TestimonialDocument } from '../../prismicio-types'
import { motion, useTransform, useScroll } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import { FaQuoteLeft } from 'react-icons/fa'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@/components/PrismicRichText'
import Heading from './Heading'

interface SliderProps extends CarouselSlice {
  content: Array<TestimonialDocument> | undefined
}

export default function Slider({ content, primary }: SliderProps) {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: targetRef })
  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-95%'])
  return (
    <div ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-16 left-1/2 w-full -translate-x-1/2 text-center">
          <PrismicRichText
            field={primary.heading}
            components={{
              heading2: ({ children }: { children: ReactNode }) => (
                <Heading as="h2" size="5xl" className="lg:text-center">
                  {children}
                </Heading>
              ),
            }}
          />
        </div>
        <motion.div style={{ x }} className="flex gap-8">
          {content &&
            content.length > 0 &&
            content.map((item, i) => {
              return (
                <div
                  key={item.id}
                  className="grid w-[300px] gap-x-4 rounded-lg border shadow-sm lg:w-[900px] lg:grid-cols-3"
                >
                  <div className="col-span-1 hidden lg:block">
                    <PrismicNextImage
                      field={item.data.image}
                      className="lg:rounded-l-lg"
                    />
                  </div>
                  <blockquote className="prose lg:prose-lg xl:prose-xl relative col-span-2 flex flex-col justify-between p-6">
                    <FaQuoteLeft className="text-color-primary h-4 w-4 lg:h-12 lg:w-12" />
                    <PrismicRichText field={item.data.text} />
                    <footer>{'-' + item.data.attribution}</footer>
                  </blockquote>
                </div>
              )
            })}
        </motion.div>
      </div>
    </div>
  )
}

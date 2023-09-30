'use client'
import Section from '@/components/Section'
import { CarouselSlice, TestimonialDocument } from '../../prismicio-types'
import { motion, useTransform, useScroll } from 'framer-motion'
import { useRef } from 'react'
import { FaQuoteLeft } from 'react-icons/fa'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@/components/PrismicRichText'

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
        <div className="absolute left-1/2 top-16 w-full -translate-x-1/2 text-center">
          <PrismicRichText field={primary.heading} />
        </div>
        <motion.div style={{ x }} className="flex gap-8">
          {content &&
            content.length > 0 &&
            content.map((item, i) => {
              return (
                <div
                  key={item.id}
                  className="grid w-[300px] gap-x-4 rounded-lg border shadow lg:w-[900px] lg:grid-cols-3"
                >
                  <div className="col-span-1 hidden lg:block">
                    <PrismicNextImage
                      field={item.data.image}
                      className="lg:rounded-l-lg"
                    />
                  </div>
                  <blockquote className="prose relative col-span-2 flex flex-col justify-between p-6 lg:prose-lg xl:prose-xl">
                    <FaQuoteLeft className="h-4 w-4 text-color-primary lg:h-12 lg:w-12" />
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

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
      <div className="h-screen sticky top-0 flex items-center overflow-hidden">
        <div className="top-16 absolute left-1/2 -translate-x-1/2 w-full text-center">
          <PrismicRichText field={primary.heading} />
        </div>
        <motion.div style={{ x }} className="flex gap-8">
          {content &&
            content.length > 0 &&
            content.map((item, i) => {
              return (
                <div
                  key={item.id}
                  className="grid gap-x-4 lg:grid-cols-3 w-[300px] lg:w-[900px] shadow border rounded-lg"
                >
                  <div className="lg:block col-span-1 hidden">
                    <PrismicNextImage
                      field={item.data.image}
                      className="lg:rounded-l-lg"
                    />
                  </div>
                  <blockquote className="col-span-2 relative flex flex-col justify-between prose lg:prose-lg xl:prose-xl p-6">
                    <FaQuoteLeft className="w-4 h-4 text-color-primary lg:w-12 lg:h-12" />
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

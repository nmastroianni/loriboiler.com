'use client'
import Section from '@/components/Section'
import { TestimonialDocument } from '../../prismicio-types'

interface SliderProps {
  testimonials: Array<TestimonialDocument>
}

export default function Slider({ testimonials }: SliderProps) {
  return (
    <Section>
      <h2>SLIDER COMPONENT</h2>
    </Section>
  )
}

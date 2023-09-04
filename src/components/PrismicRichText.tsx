import {
  PrismicRichText as BasePrismicRichText,
  JSXMapSerializer,
  PrismicRichTextProps,
} from '@prismicio/react'
import * as prismic from '@prismicio/client'
import Heading from '@/components/Heading'
import React from 'react'

const defaultComponents: JSXMapSerializer = {
  heading1: ({ children }) => {
    return (
      <Heading as="h1" size="7xl">
        {children}
      </Heading>
    )
  },
  heading2: ({ children }) => {
    return (
      <Heading as="h2" size="6xl">
        {children}
      </Heading>
    )
  },
  heading3: ({ children }) => {
    return (
      <Heading as="h3" size="5xl">
        {children}
      </Heading>
    )
  },
  heading4: ({ children }) => {
    return (
      <Heading as="h4" size="4xl">
        {children}
      </Heading>
    )
  },
  heading5: ({ children }) => {
    return (
      <Heading as="h5" size="3xl">
        {children}
      </Heading>
    )
  },
  heading6: ({ children }) => {
    return (
      <Heading as="h6" size="2xl">
        {children}
      </Heading>
    )
  },
  paragraph: ({ children }) => {
    return <p className="my-6 lg:my-10 text-color-neutral">{children}</p>
  },
}

export const PrismicRichText = function PrismicRichText<
  LinkResolverFunction extends
    prismic.LinkResolverFunction<any> = prismic.LinkResolverFunction,
>({ components, ...props }: PrismicRichTextProps<LinkResolverFunction>) {
  return (
    <BasePrismicRichText
      components={{ ...defaultComponents, ...components }}
      {...props}
    />
  )
}

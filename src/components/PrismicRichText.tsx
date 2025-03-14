import {
  PrismicRichText as BasePrismicRichText,
  JSXMapSerializer,
  PrismicRichTextProps as BasePrismicRichTextProps,
} from '@prismicio/react'
import * as prismic from '@prismicio/client'
import Heading from '@/components/Heading'
import React, { ReactNode } from 'react'

const defaultComponents: JSXMapSerializer = {
  heading1: ({ children }: { children: ReactNode }) => {
    return (
      <Heading as="h1" size="6xl">
        {children}
      </Heading>
    )
  },
  heading2: ({ children }: { children: ReactNode }) => {
    return (
      <Heading as="h2" size="5xl">
        {children}
      </Heading>
    )
  },
  heading3: ({ children }: { children: ReactNode }) => {
    return (
      <Heading as="h3" size="4xl">
        {children}
      </Heading>
    )
  },
  heading4: ({ children }: { children: ReactNode }) => {
    return (
      <Heading as="h4" size="3xl">
        {children}
      </Heading>
    )
  },
  heading5: ({ children }: { children: ReactNode }) => {
    return (
      <Heading as="h5" size="2xl">
        {children}
      </Heading>
    )
  },
  heading6: ({ children }: { children: ReactNode }) => {
    return (
      <Heading as="h6" size="xl">
        {children}
      </Heading>
    )
  },
  paragraph: ({ children }: { children: ReactNode }) => {
    return (
      <p className="text-foreground prose lg:prose-lg xl:prose-xl mx-auto my-6 lg:my-10">
        {children}
      </p>
    )
  },
  embed: ({ node }) => {
    return (
      <div className="mx-auto max-w-(--breakpoint-sm) overflow-hidden rounded shadow-xl">
        <div
          className="aspect-h-9 aspect-w-16"
          dangerouslySetInnerHTML={{ __html: node.oembed.html || '' }}
        />
      </div>
    )
  },
}

// Define PrismicRichTextProps as a generic type
interface PrismicRichTextProps<
  LinkResolverFunction extends
    prismic.LinkResolverFunction = prismic.LinkResolverFunction,
> extends BasePrismicRichTextProps {
  components?: Record<string, React.ComponentType<any>>
  // Add other props as needed
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

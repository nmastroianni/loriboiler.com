import React from 'react'
import { cn } from '@/lib/utils/cn'
import { PostDocument } from '../../prismicio-types'
import Link from 'next/link'
import { PrismicNextImage } from '@prismicio/next'
import { isFilled } from '@prismicio/client'
import Heading from './Heading'
import { PrismicRichText } from './PrismicRichText'

type BlogCardProps = {
  as?: React.ElementType
  className?: string
  post: PostDocument
}

export default function BlogCard({
  as: Comp = 'li',
  post,
  className,
  ...restProps
}: BlogCardProps) {
  return (
    <Comp
      className={cn(
        'block rounded-lg border border-color-secondary my-8 lg:my-12',
        className,
      )}
      {...restProps}
    >
      <article>
        {isFilled.image(post.data.meta_image) && (
          <Link href={`${post.url}`}>
            <PrismicNextImage
              field={post.data.meta_image}
              className="rounded-t-lg"
              fallbackAlt=""
            />
          </Link>
        )}
        <div className="p-6">
          <PrismicRichText
            field={post.data.title}
            components={{
              heading1: ({ children }) => (
                <Heading as="h1" size="3xl" className="text-left">
                  {children}
                </Heading>
              ),
            }}
          />
          <p className="mb-4">{post.data.excerpt}</p>
          <Link
            href={`${post.url}`}
            className="inline-block rounded bg-color-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-color-base transition duration-150 ease-in hover:bg-emerald-900 hover:shadow hover:shadow-color-primary"
          >
            Continue Reading
          </Link>
        </div>
      </article>
    </Comp>
  )
}

import React from 'react'
import { cn } from '@/lib/utils/cn'
import { PostDocument, TagDocument } from '../../prismicio-types'
import Link from 'next/link'
import { PrismicNextImage } from '@prismicio/next'
import { isFilled } from '@prismicio/client'
import Heading from './Heading'
import { PrismicRichText } from './PrismicRichText'
import { HiTag } from 'react-icons/hi'

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
  const {
    data: { custom_tags },
  } = post

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
        <div className="p-4">
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
            className="inline-block rounded bg-color-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-color-base transition duration-150 ease-in hover:bg-color-accent hover:shadow hover:shadow-color-accent hover:text-color-neutral"
          >
            Continue Reading
          </Link>
          {isFilled.group(post.data.custom_tags) ? (
            <ul className="flex justify-start gap-x-4">
              {custom_tags.map(({ custom_tag }) => {
                const ct = custom_tag as unknown
                const td = ct as TagDocument
                return (
                  <li className="py-4" key={td.id}>
                    <Link href={td.url || '#'}>
                      <HiTag
                        className={`h-5 w-5 text-color-accent inline mr-1`}
                      />
                      {td.uid}
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
      </article>
    </Comp>
  )
}

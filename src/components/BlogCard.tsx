import React from 'react'
import { cn } from '@/lib/utils/cn'
import { PostDocument, TagDocument } from '../../prismicio-types'
import Link from 'next/link'
import { PrismicNextImage } from '@prismicio/next'
import { isFilled } from '@prismicio/client'
import Heading from './Heading'
import { PrismicRichText } from './PrismicRichText'
import { HiTag } from 'react-icons/hi'
import { Button } from '@/components/ui/button'

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
        'my-8 block overflow-hidden rounded-lg border border-color-secondary lg:my-12',
        className,
      )}
      {...restProps}
    >
      <article>
        {isFilled.image(post.data.featured_image) && (
          <Link href={`${post.url}`}>
            <PrismicNextImage
              field={post.data.featured_image}
              className=""
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
          <p className="text-foreground mb-4">{post.data.excerpt}</p>
          <Button asChild>
            <Link
              href={`${post.url}`}
              className="inline-block rounded bg-color-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-color-base transition duration-150 ease-in hover:bg-color-accent hover:text-color-neutral hover:shadow hover:shadow-color-accent"
            >
              Continue Reading
            </Link>
          </Button>
          {isFilled.group(post.data.custom_tags) ? (
            <ul className="flex justify-start gap-x-4">
              {custom_tags.map(({ custom_tag }) => {
                const ct = custom_tag as unknown
                const td = ct as TagDocument
                return (
                  <li className="py-4" key={td.id}>
                    <Link href={td.url || '#'}>
                      <HiTag
                        className={`mr-1 inline h-5 w-5 text-color-accent`}
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

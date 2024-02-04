import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'
import * as prismic from '@prismicio/client'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { Graph } from 'schema-dts'
import Section from '@/components/Section'
import { PrismicNextImage } from '@prismicio/next'
import { cn } from '@/lib/utils/cn'
import { PrismicRichText } from '@/components/PrismicRichText'
import Heading from '@/components/Heading'
import { TagDocument } from '../../../../prismicio-types'
import { HiTag } from 'react-icons/hi'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page = await client.getByUID('post', params.uid).catch(() => notFound())
  const settings = await client.getSingle('settings')
  let pubDate
  page.data.date_published
    ? (pubDate = new Date(page.data.date_published).toLocaleDateString(
        'en-US',
        {
          weekday: 'long',
          month: 'long',
          day: '2-digit',
          year: 'numeric',
          timeZone: 'UTC',
        },
      ))
    : (pubDate = new Date(page.first_publication_date).toLocaleDateString(
        'en-CA',
        {
          weekday: 'long',
          month: 'long',
          day: '2-digit',
          year: 'numeric',
          timeZone: 'UTC',
        },
      ))
  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `https://${settings.data.domain || `example.com`}/#lori`,
        name: 'Lori Boiler',
        description: settings.data.site_meta_description || undefined,
      },
      {
        '@type': 'WebSite',
        '@id': `https://${settings.data.domain || `example.com`}/#site`,
        name: 'Lori Boiler',
        url: `https://${settings.data.domain || `example.com`}/`,
      },
      {
        '@type': 'BlogPosting',
        '@id': `https://${settings.data.domain || `example.com`}${
          page.url
        }/#post`,
        headline: prismic.asText(page.data.title),
        description:
          page.data.excerpt || page.data.meta_description || undefined,
        mainEntityOfPage: `https://${settings.data.domain || `example.com`}${
          page.url
        }`,
        datePublished: page.data.date_published || page.first_publication_date,
        dateModified: page.last_publication_date || undefined,
        author: {
          '@id': `https://${settings.data.domain || `example.com`}/#lori`,
        },
        image: page.data.meta_image.url || undefined,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section
        className={cn(
          'bg-primary relative mb-8 flex items-center justify-center py-36 lg:py-44 xl:py-56 2xl:py-72',
        )}
      >
        {prismic.isFilled.image(page.data.featured_image) && (
          <PrismicNextImage
            field={page.data.featured_image}
            fill
            sizes="45vw"
            className="absolute inset-0 object-cover opacity-10"
            priority
          />
        )}
        <div className="z-10 mx-auto flex max-w-screen-lg flex-col px-4">
          <PrismicRichText
            field={page.data.title}
            components={{
              heading1: ({ children }) => (
                <Heading
                  as="h1"
                  size="7xl"
                  className="z-10 text-color-base lg:text-center"
                >
                  {children}
                </Heading>
              ),
            }}
          />
          <p className="z-10 text-center text-sm font-medium uppercase text-color-base">
            {pubDate}
          </p>
          {prismic.isFilled.group(page.data.custom_tags) ? (
            <ul className="z-10 my-2 flex justify-center gap-x-4">
              {page.data.custom_tags.map(({ custom_tag }) => {
                const ct = custom_tag as unknown
                const tag = ct as TagDocument
                return (
                  <li className="text-color-base" key={tag.id}>
                    <Link href={tag.url || '#'}>
                      <HiTag className="mr-1 inline h-4 w-4" />
                      {tag.uid}
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
      </section>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const client = createClient()
  const page = await client.getByUID('post', params.uid).catch(() => notFound())
  const settings = await client.getSingle('settings')

  return {
    title: `${prismic.asText(page.data.title) || page.data.meta_title} • ${
      settings.data.site_title
    }`,
    description:
      page.data.meta_description || settings.data.site_meta_description,
    openGraph: {
      images: [
        page.data.meta_image.url || settings.data.site_meta_image.url || '',
      ],
    },
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('post')
  return pages.map(page => {
    return { uid: page.uid }
  })
}

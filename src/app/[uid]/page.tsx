import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'
import { PrismicRichText } from '@/components/PrismicRichText'
import * as prismic from '@prismicio/client'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { Graph } from 'schema-dts'
import Section from '@/components/Section'
import BlogCard from '@/components/BlogCard'
import Pagination from '@/components/Pagination'

type Params = { uid: string }
type SearchParams = {
  [key: string]: string | string[] | undefined
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const client = createClient()
  const pageNumber = Number(searchParams['page']) || 1
  const page = await client.getByUID('page', params.uid).catch(() => notFound())
  const heroes = page.data.slices.filter(slice => slice.slice_type === 'hero')
  let posts
  if (page.uid === 'blog') {
    posts = await client.getByType('post', {
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
      page: pageNumber,
      pageSize: 5,
    })
  }
  const settings = await client.getSingle('settings')

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
        '@type': 'WebPage',
        '@id': `https://${settings.data.domain || `example.com`}/#${page.uid}`,
        about: page.data.meta_description || undefined,
        accountablePerson: {
          '@id': `https://${settings.data.domain || `example.com`}/#lori`,
        },
        author: {
          '@id': `https://${settings.data.domain || `example.com`}/#lori`,
        },
        copyrightHolder: {
          '@id': `https://${settings.data.domain || `example.com`}/#lori`,
        },
        datePublished: page.first_publication_date,
        dateModified: page.last_publication_date,
        image:
          page.data.meta_image.url ||
          settings.data.site_meta_image.url ||
          undefined,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {heroes.length < 1 && (
        <div className="prose mx-auto lg:prose-lg xl:prose-xl 2xl:prose-2xl">
          <PrismicRichText field={page.data.title} />
        </div>
      )}
      <SliceZone slices={page.data.slices} components={components} />
      {/* CODE FOR BLOG PAGE ONLY */}
      {page.uid === 'blog' && (
        <Section width="md">
          {posts && posts.results.length > 0 ? (
            <ul className="px-4 lg:px-0">
              {posts.results.map(post => {
                return (
                  <BlogCard
                    key={post.id}
                    post={post}
                    className="mx-auto max-w-xl"
                  />
                )
              })}
            </ul>
          ) : (
            <p className="prose mx-auto lg:prose-lg xl:prose-xl">
              No posts have been published yet. Please check back again soon!
            </p>
          )}
          {(posts?.next_page !== null || posts?.prev_page !== null) && (
            <Pagination
              hasNextPage={posts?.next_page !== null}
              hasPrevPage={posts?.prev_page !== null}
              totalPages={Number(posts?.total_pages)}
            />
          )}
        </Section>
      )}
      {/* END BLOG PAGE CODE */}
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const client = createClient()
  const page = await client.getByUID('page', params.uid).catch(() => notFound())
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
  const pages = await client.getAllByType('page')

  return pages.map(page => {
    return { uid: page.uid }
  })
}

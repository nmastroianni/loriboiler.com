import { Metadata } from 'next'
import { SliceZone } from '@prismicio/react'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { Graph } from 'schema-dts'

export default async function Page() {
  const client = createClient()
  const page = await client.getSingle('homepage')
  const settings = await client.getSingle('settings')
  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://www.loriboiler.com/#lori',
        name: 'Lori Boiler',
        givenName: 'Lori',
        familyName: 'Boiler',
        telephone: '856-446-9416',
        affiliation: [
          {
            '@type': 'Organization',
            legalName: '1st Colonial Community Bank',
            location: {
              '@type': 'PostalAddress',
              addressCountry: 'USA',
              addressLocality: 'Mount Laurel',
              addressRegion: 'New Jersey',
              postalCode: '08054',
              streetAddress: '1000 Atrium Way, Suite 200',
            },
            contactPoint: [
              {
                '@type': 'ContactPoint',
                telephone: '877-785-8550',
                contactType: 'customer service',
              },
              {
                '@type': 'ContactPoint',
                telephone: '877-785-8550',
                contactType: 'billing support',
              },
            ],
            sameAs: [
              'https://www.1stcolonial.com/',
              'https://www.facebook.com/people/1st-Colonial-Community-Bank/100083081697427/',
              'https://www.instagram.com/1stcolonialbank/',
            ],
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.loriboiler.com/#site',
        publisher: {
          '@id': 'https://www.loriboiler.com/#lori',
        },
        url: 'https://www.loriboiler.com',
        inLanguage: 'en-US',
        name: 'Lori Bolier',
      },
      {
        '@type': 'WebPage',
        url: 'https://www.loriboiler.com/',
        name: 'Lori Boiler - Mortgage Professional | New Jersey',
        datePublished: page.first_publication_date,
        dateModified: page.last_publication_date || page.first_publication_date,
        about: {
          '@id': 'https://www.loriboiler.com/#lori',
        },
        isPartOf: {
          '@id': 'https://www.loriboiler.com/#site',
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url:
            page.data.meta_image.url || settings.data.og_image.url || undefined,
        },
        inLanguage: 'en-US',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SliceZone slices={page.data.slices} components={components} />)
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('homepage')
  const settings = await client.getSingle('settings')

  return {
    title: page.data.meta_title || settings.data.site_title,
    description: page.data.meta_description || settings.data.meta_description,
    openGraph: {
      images: [page.data.meta_image.url || settings.data.og_image.url || ''],
    },
  }
}

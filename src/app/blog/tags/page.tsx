import Heading from '@/components/Heading'
import Section from '@/components/Section'
import { createClient } from '@/prismicio'
import { asText } from '@prismicio/client'
import Link from 'next/link'
import { HiTag } from 'react-icons/hi'

export default async function TagsIndex() {
  const client = createClient()
  const tags = await client.getByType('tag', {
    orderings: {
      field: `my.tag.uid`,
      direction: 'asc',
    },
  })
  return (
    <>
      <Section width="md">
        <Heading
          as="h1"
          size="5xl"
          className="text-color-primary lg:text-center"
        >
          Explore by Tag
        </Heading>
        <hr className="my-6 lg:my-12" />
        {tags.results.length > 0 ? (
          <ul className="prose mx-auto lg:prose-lg xl:prose-xl">
            {tags.results.map(tag => (
              <li key={tag.id}>
                <Link href={tag.url || '#'}>
                  <HiTag className="mr-3 inline h-5 w-5" />
                  {asText(tag.data.title)}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>There are no tags yet in our system</p>
        )}
      </Section>
    </>
  )
}

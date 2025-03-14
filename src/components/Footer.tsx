import { createClient } from '@/prismicio'
import { cn } from '@/lib/utils/cn'
import Section from './Section'
import Link from 'next/link'
import { FaFacebook } from 'react-icons/fa'
import { PrismicNextLink } from '@prismicio/next'
import { isFilled } from '@prismicio/client'
export default async function Footer() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return (
    <Section
      as="footer"
      className={cn('text-muted-foreground bg-muted lg:text-lg')}
    >
      <div className="mx-auto my-6 grid max-w-(--breakpoint-lg) place-items-center gap-8 lg:my-0 lg:grid-cols-2">
        <div>
          {isFilled.link(settings.data.facebook_page) && (
            <PrismicNextLink field={settings.data.facebook_page}>
              <FaFacebook className="h-8 w-8 text-color-base" />
              <span className="sr-only">Visit my Facebook page</span>
            </PrismicNextLink>
          )}
        </div>
        <div className="text-center lg:text-left">
          <Link href="/">{settings.data.site_title} NMLS #90059</Link>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
      <div className="my-4 text-center text-xs lg:my-8">
        <Link href={'/privacy'}>Privacy</Link>
        <p className=" my-3">
          This site does not allow for mortgage solicitation or loan
          applications for any real estate transaction. It is for informational
          purposes only.
        </p>
      </div>
    </Section>
  )
}

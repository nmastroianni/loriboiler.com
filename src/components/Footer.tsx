import { createClient } from '@/prismicio'
import { cn } from '@/lib/utils/cn'
import Section from './Section'
import Link from 'next/link'
import { FaFacebook } from 'react-icons/fa'
export default async function Footer() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return (
    <Section
      as="footer"
      className={cn('bg-color-neutral text-color-base lg:text-lg')}
    >
      <div className="mx-auto grid max-w-screen-lg place-items-center lg:grid-cols-2 gap-8">
        <div>
          <FaFacebook className="h-8 w-8 text-color-base" />
        </div>
        <div className="text-center lg:text-left">
          <Link href="/">{settings.data.site_title} NMLS #90059</Link>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
      <div className="my-4 text-center lg:my-8 text-xs">
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

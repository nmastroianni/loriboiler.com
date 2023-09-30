import { createClient } from '@/prismicio'
import { cn } from '@/utils/cn'
import Section from './Section'
import Link from 'next/link'
import { FaFacebook } from 'react-icons/fa'
export default async function Footer() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return (
    <Section
      as="footer"
      className={cn('bg-color-primary text-color-base lg:text-lg')}
    >
      <div className="mx-auto grid max-w-screen-lg place-items-center lg:grid-cols-2">
        <div>
          <FaFacebook className="h-8 w-8 text-color-base" />
        </div>
        <div>
          <Link href="/">{settings.data.site_title}</Link>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
      <div className="my-4 text-center lg:my-8">Privacy</div>
    </Section>
  )
}

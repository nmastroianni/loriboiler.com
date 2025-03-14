import { createClient } from '@/prismicio'
import { PrismicNextLink } from '@prismicio/next'
import Link from 'next/link'
import Section from '@/components/Section'
import Logo from '@/components/Logo'
import MobileMenu from './MobileMenu'
import { Button } from '@/components/ui/button'
import DesktopMenu from './DesktopMenu'

export default async function Header() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  const { navigation } = settings.data
  return (
    <Section
      as="header"
      width="lg"
      className="shadow-accent justify-start py-4 shadow-xs md:py-4 lg:py-6"
    >
      <div className="flex items-center justify-between">
        <Link href="/">
          <Logo className="text-primary h-[50px] lg:h-[113px]" />
          <span className="sr-only">Return to Homepage</span>
        </Link>
        <MobileMenu navigation={navigation} />
        {navigation.length && (
          <nav className="hidden text-xl lg:block">
            <ul className="flex gap-x-12">
              <DesktopMenu navigation={navigation} />
            </ul>
          </nav>
        )}
      </div>
    </Section>
  )
}

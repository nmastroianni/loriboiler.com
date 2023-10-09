import { createClient } from '@/prismicio'
import { PrismicNextLink } from '@prismicio/next'
import Link from 'next/link'
import Section from '@/components/Section'
import Logo from '@/components/Logo'
import MobileMenu from './MobileMenu'

export default async function Header() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  const { navigation } = settings.data
  return (
    <Section
      as="header"
      width="lg"
      className="justify-start py-4 shadow-sm shadow-color-accent lg:py-6"
    >
      <div className="flex items-center justify-between">
        <Link href="/">
          <Logo className="h-[50px] text-color-primary lg:h-[113px]" />
          <span className="sr-only">Return to Homepage</span>
        </Link>
        <MobileMenu navigation={navigation} />
        {navigation.length && (
          <nav className="hidden text-xl lg:block">
            <ul className="flex gap-x-12">
              {navigation.map(({ label, link }) => (
                <li key={label}>
                  <PrismicNextLink field={link}>{label}</PrismicNextLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </Section>
  )
}

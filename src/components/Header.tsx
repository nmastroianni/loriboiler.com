import { createClient } from '@/prismicio'
import { PrismicNextLink } from '@prismicio/next'
import Link from 'next/link'
import Section from '@/components/Section'
import Logo from '@/components/Logo'
import { HiMenu } from 'react-icons/hi'

export default async function Header() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  const { navigation } = settings.data

  return (
    <Section
      as="header"
      width="lg"
      className="py-12 lg:py-6 justify-start shadow-sm shadow-color-accent"
    >
      <div className="flex justify-between items-center">
        <Link href="/">
          <Logo className="h-[65px] lg:h-[113px] text-color-primary" />
        </Link>
        <HiMenu className="text-color-secondary h-12 w-12 lg:hidden" />
        {navigation.length && (
          <nav className="hidden lg:block text-xl">
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

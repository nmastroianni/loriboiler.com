import { createClient } from '@/prismicio'
import { PrismicNextLink } from '@prismicio/next'
import Link from 'next/link'

export default async function Header() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  const { navigation } = settings.data

  return (
    <header>
      <Link href="/">{settings.data.site_title}</Link>
      {navigation.length && (
        <nav>
          <ul>
            {navigation.map(({ label, link }) => (
              <li key={label}>
                <PrismicNextLink field={link}>{label}</PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

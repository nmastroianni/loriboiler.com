import { createClient } from '@/prismicio'
import Link from 'next/link'
export default async function Footer() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return (
    <footer>
      <Link href="/">{settings.data.site_title}</Link>
      <p>&copy; {new Date().getFullYear()}</p>
    </footer>
  )
}

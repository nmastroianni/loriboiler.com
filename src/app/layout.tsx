import { Playfair_Display, Open_Sans } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import { PrismicPreview } from '@prismicio/next'
import { clsx } from 'clsx'
import { createClient, repositoryName } from '@/prismicio'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

/**
 * Heading & Body fonts
 */
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})
const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

/**
 * fetch and generate Metadata
 */

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return {
    metadataBase: new URL('https://www.loriboiler.com'),
    title: settings.data.site_title || 'Lori Boiler',
    description:
      settings.data.meta_description ||
      `Lori Boiler has been delivering friendly honest service you can depend on for over 30 years. Contact her today, and  you'll see`,
    openGraph: {
      images: [settings.data.og_image.url || ''],
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          playfairDisplay.variable,
          openSans.variable,
          `font-opensans text-color-neutral`,
        )}
      >
        <Header />
        {children}
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  )
}

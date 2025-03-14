'use client'
import { usePathname } from 'next/navigation'
import { SettingsDocumentDataNavigationItem } from '../../prismicio-types'
import { Button } from '@/components/ui/button'
import { PrismicNextLink } from '@prismicio/next'
import { cn } from '@/lib/utils'
import { JSX } from 'react'

type DesktopMenuProps = {
  navigation: Array<SettingsDocumentDataNavigationItem>
}

const DesktopMenu = (navigation: DesktopMenuProps): JSX.Element | null => {
  const pathname = usePathname()

  return (
    <>
      {navigation.navigation.map(({ label, link }) => {
        if ('url' in link) {
          return (
            <li key={label}>
              <Button
                variant="ghost"
                asChild
                className={cn('text-xl', {
                  'bg-accent/20': link.url === pathname,
                })}
              >
                <PrismicNextLink field={link}>{label}</PrismicNextLink>
              </Button>
            </li>
          )
        }
        return null
      })}
    </>
  )
}

export default DesktopMenu

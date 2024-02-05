'use client'
import { Menu, Transition } from '@headlessui/react'
import { PrismicNextLink } from '@prismicio/next'
import { Fragment } from 'react'
import { HiMenu } from 'react-icons/hi'
import { SettingsDocumentDataNavigationItem } from '../../prismicio-types'
import { usePathname } from 'next/navigation'

type MobileMenuProps = {
  navigation: Array<SettingsDocumentDataNavigationItem>
}

export default function MobileMenu(navigation: MobileMenuProps) {
  const pathname = usePathname()
  return (
    <Menu as="div" className="relative z-30 inline-block text-left lg:hidden">
      <div>
        <Menu.Button className="focus-visible:ring-secondary inline-flex w-full  justify-center px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75">
          <HiMenu className="text-secondary h-8 w-8" />
          <span className="sr-only">Open Menu</span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="ring-accent absolute right-5 mt-2 w-56  origin-top-right rounded-md bg-neutral-100 shadow-lg ring-1 ring-opacity-5 focus:outline-none ">
          <div className="p-1">
            {navigation.navigation.map((item, i) => {
              if (item.label) {
                return (
                  <Menu.Item key={item.label + i}>
                    {({ active, close }) => {
                      if ('url' in item.link) {
                        active = pathname === item.link.url
                      }
                      return (
                        <div
                          className={`${
                            active
                              ? 'bg-accent/50 text-secondary'
                              : 'text-primary'
                          } divide-secondary grid place-items-center divide-y-2 rounded-md px-2 py-2 text-center`}
                        >
                          <PrismicNextLink
                            field={item.link}
                            className={`block w-full py-3`}
                            onClick={close}
                          >
                            {item.label}
                          </PrismicNextLink>
                        </div>
                      )
                    }}
                  </Menu.Item>
                )
              }
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

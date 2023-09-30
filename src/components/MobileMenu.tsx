'use client'
import { HiMenu, HiChevronDown } from 'react-icons/hi'
import { Menu, Transition } from '@headlessui/react'
import { PrismicNextLink } from '@prismicio/next'
import { Fragment, useEffect, useRef, useState } from 'react'
import {
  SettingsDocumentData,
  SettingsDocumentDataNavigationItem,
} from '../../prismicio-types'

type MobileMenuProps = {
  navigation: Array<SettingsDocumentDataNavigationItem>
}

export default function MobileMenu(navigation: MobileMenuProps) {
  return (
    <Menu as="div" className="relative inline-block text-left lg:hidden z-30">
      <div>
        <Menu.Button className="inline-flex w-full justify-center  px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-opacity-75">
          <HiMenu className="h-8 w-8 text-color-secondary" />
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
        <Menu.Items className="absolute right-5 mt-2 w-56 origin-top-right  rounded-md bg-neutral-100 shadow-lg ring-1 ring-color-accent ring-opacity-5 focus:outline-none ">
          <div className="p-1">
            {navigation.navigation.map((item, i) => {
              if (item.label) {
                return (
                  <Menu.Item key={item.label + i}>
                    {({ active, close }) => (
                      <div
                        className={`${
                          active
                            ? 'bg-brand-secondary text-color-secondary'
                            : 'text-color-primary'
                        } grid place-items-center rounded-md px-2 py-2 text-center divide-y-2 divide-color-secondary`}
                      >
                        <PrismicNextLink
                          field={item.link}
                          className={`block w-full py-3`}
                          onClick={close}
                        >
                          {item.label}
                        </PrismicNextLink>
                      </div>
                    )}
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

'use client'

import { cn } from '@/lib/utils/cn'
import * as React from 'react'
import { HiX } from 'react-icons/hi'
import { AnimatePresence, motion } from 'framer-motion'
import Script from 'next/script'
import { Button } from '@/components/ui/button'

export default function Consent({ nonce }: { nonce: string | undefined }) {
  const [consent, setConsent] = React.useState<boolean>(false)
  const [hideBanner, setHideBanner] = React.useState<boolean>(true)

  type Preferences = {
    ad_storage: 'granted' | 'denied'
    analytics_storage: 'granted' | 'denied'
    date_denied?: string
  }
  React.useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem('consentMode') === null) {
        setHideBanner(false)
        setConsent(false)
      } else {
        let consentMode: Preferences = JSON.parse(
          `${localStorage.getItem('consentMode')}`,
        )
        setConsent(consentMode.analytics_storage === 'granted')
        if (consentMode.date_denied) {
          const currentDate = new Date()
          const timeDifference =
            currentDate.getTime() - new Date(consentMode.date_denied).getTime()
          const daysSinceDenied = Math.floor(
            timeDifference / (1000 * 60 * 60 * 24),
          )
          daysSinceDenied > 14 && localStorage.removeItem('consentMode')
        }
      }
    }, 3000)
  }, [])
  return (
    <>
      {consent === true && (
        <Script
          id="consupd"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('consent', 'update', {
                'ad_storage': 'granted',
                'analytics_storage': 'granted'
              });
              localStorage.setItem('consentMode', JSON.stringify({ad_storage: 'granted', analytics_storage: 'granted'}));
              fbq('consent', 'grant');
            `,
          }}
          nonce={nonce}
        />
      )}
      <AnimatePresence>
        {!hideBanner && (
          <motion.div
            initial={{
              y: 152,
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: 152,
            }}
            id="consent-banner"
            className={cn(
              'bg-accent/95 fixed bottom-0 z-10 grid w-full p-3 md:grid-cols-5',
            )}
          >
            <p className="prose prose-sm mx-auto my-4 px-6 text-left md:col-span-3">
              I respect your right to privacy. Period. If you wish to allow
              cookies, I will get to learn a few things like what pages my
              clients visit, how long they stay, etc. Please choose your
              preference below. Data are only collected if you provide consent
              (which is how it should be).
            </p>
            <div className="my-4 flex items-center justify-evenly md:col-span-2">
              <button
                className="absolute top-2 right-2"
                onClick={e => {
                  setHideBanner(true)
                }}
              >
                <HiX className="text-background h-6 w-6" />
                <span className="sr-only">Close</span>
              </button>
              <Button
                onClick={e => {
                  setHideBanner(true)
                  localStorage.setItem(
                    'consentMode',
                    JSON.stringify({
                      ad_storage: 'denied',
                      analytics_storage: 'denied',
                      date_denied: new Date(),
                    }),
                  )
                }}
                variant="link"
              >
                Deny All
              </Button>
              <Button
                onClick={() => {
                  setConsent(true)
                  setHideBanner(true)
                }}
                variant="default"
                size="lg"
              >
                Accept All
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

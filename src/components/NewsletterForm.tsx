'use client'

import * as React from 'react'
import { NewsletterSlice } from '../../prismicio-types'
import { cn } from '@/lib/utils/cn'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { KeyTextField } from '@prismicio/client'

const NewsletterForm = (data: NewsletterSlice): React.JSX.Element => {
  const {
    primary: { button_color, button_text, placeholder_text },
    id,
  } = data

  const [formInteraction, setFormInteraction] = React.useState(false)
  // const { pending } = useFormStatus()

  const handleFocus = () => {
    console.log('handlefocus triggered before', formInteraction)
    !formInteraction && setFormInteraction(true)
  }

  React.useEffect(() => {
    console.log('form useEffect called', formInteraction)
    if (formInteraction) {
      const recaptchaScript = document.createElement('script')
      recaptchaScript.src = `https://www.google.com/recaptcha/api.js?render=6Lc5v7woAAAAAJFT2iNOe0oJTMwRB0FKruVOoAJ2`
      recaptchaScript.async = true
      recaptchaScript.defer = true
      document.head.appendChild(recaptchaScript)
      return () => {
        // Get all script tags: returns HTMLcollection
        const scripts = document.head.querySelectorAll('script')
        // Loop through the HTMLcollection (array-like but not array)
        for (var i = 0; i < scripts.length; i++) {
          // find script whose src value includes "recaptcha/releases"
          // this script is added when main recaptcha script is loaded

          if (
            scripts?.item(i)?.attributes.getNamedItem('src') &&
            scripts
              ?.item(i)
              ?.attributes?.getNamedItem('src')
              ?.value.includes('recaptcha/releases')
          ) {
            document.head.removeChild(scripts.item(i)) // remove script from head
          }
        }
        document.head.removeChild(recaptchaScript) // remove main recaptcha script from head
        // remove the recaptcha badge from the bottom right corner
        let badge = document.querySelector('.grecaptcha-badge')
        if (badge?.parentElement) {
          badge.parentElement.remove()
        }
      }
    }
  }, [formInteraction])

  type SubmitButtonProps = {
    text?: KeyTextField
  }

  function SubmitButton({
    text = 'Submit',
  }: SubmitButtonProps): React.JSX.Element {
    const { pending } = useFormStatus()

    return (
      <button type="submit" aria-disabled={pending} className={cn('btn')}>
        {text}
      </button>
    )
  }

  return (
    <form
      className="flex flex-col gap-y-4 place-self-center my-6"
      // action={addSubscriber}
    >
      <label htmlFor={`email_${id}`}>
        <span className="sr-only">What is your email address?</span>
        <input
          name={`email_${id}`}
          type="email"
          placeholder={placeholder_text || 'Enter your email here'}
          className={`form-input rounded w-full max-w-s self-end`}
          onFocus={handleFocus}
        />
      </label>
      <div>
        <SubmitButton text={button_text} />
        <p className="prose prose-sm prose-a:text-primary-content prose-a:no-underline hover:prose-a:underline">
          This site is protected by reCAPTCHA and the{' '}
          <a href="https://policies.google.com/privacy">
            Google Privacy Policy
          </a>{' '}
          and <a href="https://policies.google.com/terms">Terms of Service</a>{' '}
          apply.
        </p>
      </div>
    </form>
  )
}

export default NewsletterForm

'use client'

declare global {
  interface Window {
    grecaptcha: any
  }
}

import * as React from 'react'
import { NewsletterSlice } from '../../prismicio-types'
import { cn } from '@/lib/utils/cn'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { KeyTextField } from '@prismicio/client'
import { FieldValues, useForm } from 'react-hook-form'
import { addSubscriber } from '@/app/actions'

type FormValues = {
  email: string
  firstName: string
}

const NewsletterForm = (data: NewsletterSlice): React.JSX.Element => {
  const {
    primary: {
      button_color,
      button_text,
      email_placeholder_text,
      first_name_placeholder_text,
    },
  } = data

  const {
    register,
    trigger,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>()
  const [formInteraction, setFormInteraction] = React.useState(false)
  // const { pending } = useFormStatus()

  const handleFocus = () => {
    !formInteraction && setFormInteraction(true)
  }

  const callAction = async (formData: FormData) => {
    trigger()
    if (!isValid) return
    // calling server action passed into the client component here (if the form is valid)
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
          action: 'submit',
        })
        .then(async (recaptchaToken: string) => {
          const { message } = await addSubscriber(formData, recaptchaToken)
          console.log('callAction says ----> ', message)
        })
    })

    // const { message } = await addSubscriber(formData, token)
    // handling server action response here...
  }

  React.useEffect(() => {
    if (formInteraction) {
      const recaptchaScript = document.createElement('script')
      recaptchaScript.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`
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
    return (
      <button
        disabled={isSubmitting}
        type="submit"
        aria-disabled={isSubmitting}
        className={cn(
          'inline-block rounded my-4 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-color-base transition duration-150 ease-in hover:shadow hover:shadow-color-neutral',
          {
            'bg-color-primary': button_color === 'Primary',
            'bg-color-secondary': button_color === 'Secondary',
            'bg-color-accent text-color-neutral': button_color === 'Accent',
            'bg-color-neutral': button_color === 'Neutral',
            'border border-color-primary text-color-primary':
              button_color === 'Base',
          },
        )}
      >
        {text}
      </button>
    )
  }

  return (
    <form
      className="flex flex-col gap-y-4 place-self-center my-6"
      action={callAction}
    >
      <div
        className={cn('grid lg:grid-cols-5 gap-x-3 gap-y-6', {
          'gap-y-14': errors.email || errors.firstName,
        })}
      >
        <div className="relative lg:col-span-2">
          {errors?.firstName && (
            <p className="absolute -top-10 error-text">
              {' '}
              &darr; {errors?.firstName?.message}
            </p>
          )}
          <label htmlFor={'firstName'}>
            <span className="sr-only">What is your first name?</span>
            <input
              id="firstName"
              {...register('firstName', {
                required: 'Your first name is required.',
              })}
              type="text"
              placeholder={
                first_name_placeholder_text || 'Enter your email here'
              }
              className={`form-input rounded w-full max-w-s self-end`}
              onFocus={handleFocus}
            />
          </label>
        </div>
        <div className="relative lg:col-span-3">
          {errors?.email && (
            <p className="absolute -top-10 error-text">
              {' '}
              &darr; {errors?.email?.message}
            </p>
          )}
          <label htmlFor={'email'}>
            <span className="sr-only">What is your email address?</span>
            <input
              id="email"
              {...register('email', {
                required: 'Your email address is required.',
              })}
              type="email"
              placeholder={email_placeholder_text || 'Enter your email here'}
              className={`form-input rounded w-full max-w-s self-end`}
              onFocus={handleFocus}
            />
          </label>
        </div>
      </div>

      <div>
        <SubmitButton text={button_text} />
        <p className="mt-3 prose prose-sm prose-a:text-primary-content prose-a:no-underline hover:prose-a:underline">
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

'use client'

declare global {
  interface Window {
    grecaptcha: any
  }
}

import * as React from 'react'
import { NewsletterSlice } from '../../prismicio-types'
import { cn } from '@/lib/utils/cn'
import { KeyTextField } from '@prismicio/client'
import { useForm } from 'react-hook-form'
import { addSubscriber } from '@/app/actions'
import { Button } from '@/components/ui/button'

type FormValues = {
  email: string
  firstName: string
  token?: string
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
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>()

  const [success, setSuccess] = React.useState<boolean | null>(null)
  const [formInteraction, setFormInteraction] = React.useState(false)

  const handleFocus = () => {
    !formInteraction && setFormInteraction(true)
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
    variant?:
      | 'default'
      | 'secondary'
      | 'outline'
      | 'destructive'
      | 'ghost'
      | 'link'
  }

  function SubmitButton({
    text = 'Submit',
    variant = 'default',
  }: SubmitButtonProps): React.JSX.Element {
    return (
      <Button
        disabled={isSubmitting}
        type="submit"
        aria-disabled={isSubmitting}
        variant={variant}
      >
        {text}
      </Button>
    )
  }

  return (
    <>
      {success === true && (
        <p className="text-xl text-color-primary">
          Thank you for joining my newsletter. Check your inbox!
        </p>
      )}
      {success !== true && (
        <form
          className="my-6 flex flex-col gap-y-4 place-self-center"
          // action={otherAction}
          action={async (formData: FormData) => {
            trigger()
            if (!isValid) return
            // calling server action passed into the client component here (if the form is valid)
            window.grecaptcha.ready(() => {
              window.grecaptcha
                .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
                  action: 'submit',
                })
                .then(async (recaptchaToken: string) => {
                  formData.set('token', recaptchaToken)
                  const { message } = await addSubscriber(formData)
                  if (message === 200) {
                    reset()
                    setSuccess(true)
                  }
                })
            })
          }}
        >
          <div
            className={cn('grid gap-x-3 gap-y-6 lg:grid-cols-5', {
              'gap-y-14': errors.email || errors.firstName,
            })}
          >
            <div className="relative lg:col-span-2">
              {errors?.firstName && (
                <p className="error-text absolute -top-10">
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
                  className="w-full max-w-sm self-end rounded"
                  onFocus={handleFocus}
                />
              </label>
            </div>
            <div className="relative lg:col-span-3">
              {errors?.email && (
                <p className="error-text absolute -top-10">
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
                  placeholder={
                    email_placeholder_text || 'Enter your email here'
                  }
                  className={`w-full max-w-sm self-end rounded`}
                  onFocus={handleFocus}
                />
              </label>
            </div>
          </div>

          <div>
            <SubmitButton text={button_text} variant={button_color} />
            <p className="prose-a:text-primary-content prose prose-sm mt-3 prose-a:no-underline hover:prose-a:underline">
              This site is protected by reCAPTCHA and the{' '}
              <a href="https://policies.google.com/privacy">
                Google Privacy Policy
              </a>{' '}
              and{' '}
              <a href="https://policies.google.com/terms">Terms of Service</a>{' '}
              apply.
            </p>
          </div>
        </form>
      )}
    </>
  )
}

export default NewsletterForm

'use server'
import { google } from 'googleapis'
import { z } from 'zod'
import axios, { AxiosError } from 'axios'

const recaptchaValidation = async (token: string) => {
  const result = await (async () => {
    try {
      const response = await axios({
        url: 'https://www.google.com/recaptcha/api/siteverify',
        method: 'POST',
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        },
      })
      return { successful: true, message: Number(response.data.score) }
    } catch (err: unknown) {
      const error = err as AxiosError
      let message
      if (error.response) {
        message = `reCAPTCHA server responded with non 2xx code: ${error.response.data}`
      } else if (error.request) {
        message = `No reCAPTCHA response received: ${error.request}`
      } else {
        message = `Error setting up reCAPTCHA response: ${error.message}`
      }
      return { successful: false, message }
    }
  })()
  return result
}

export async function addSubscriber(formData: FormData, token: string) {
  const recaptchaResult = await recaptchaValidation(token)
  console.log('recaptchaResult ====> ', recaptchaResult)
  return { message: recaptchaResult.message }
}

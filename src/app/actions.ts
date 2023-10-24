'use server'
import { google } from 'googleapis'
import { z } from 'zod'

export async function addSubscriber(formData: FormData, token: string) {
  console.log(
    '^^^^^^^^ addSubscriber called with token',
    formData.get('firstName'),
  )
  return { message: 'addSubscriber called' }
}

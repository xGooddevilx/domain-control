import { z } from 'zod'

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
})

const _env = {
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
}

export const env = envSchema.parse(_env)

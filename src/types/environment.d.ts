// Set the typing of your environment variables here 👇
type MyVariables = {
  // AUTH
  CLERK_SECRET_KEY: string
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: string
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: string
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: string
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: string

  // MUX
  MUX_TOKEN_ID: string
  MUX_TOKEN_SECRET: string

  // DATABASE
  DATABASE_URL: string

  // UPLOADTHING
  UPLOADTHING_SECRET: string
  UPLOADTHING_APP_ID: string

  // STRIPE
  STRIPE_API_KEY: string
  STRIPE_WEBHOOK_SECRET: string

  NEXT_PUBLIC_APP_URL: string
}

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends MyVariables {}
  }
}

export {}

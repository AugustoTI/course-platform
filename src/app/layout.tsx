import '@/styles/global.css'
import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import { type ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'This site was created using the NextJS framework 🚀',
}

interface RootLayoutProps {
  children: ReactNode
}

const inter = Inter({
  display: 'swap',
  style: 'normal',
  subsets: ['latin'],
})

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn('antialiased', inter.className)}>
          <ToastProvider />
          <ConfettiProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

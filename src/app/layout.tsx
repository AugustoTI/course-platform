import '@/styles/global.css'
import { type Metadata } from 'next'
import { type ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { ToastProvider } from '@/components/providers/toaster-provider'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'This site was created using the NextJS framework 🚀',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn('antialiased')}>
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

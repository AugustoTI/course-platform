import { type ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <main className="flex h-full items-center justify-center">{children}</main>
}

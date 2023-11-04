import { isTeacher } from '@/lib/teacher'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { type ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { userId } = auth()

  if (!isTeacher(userId)) return redirect('/')

  return children
}

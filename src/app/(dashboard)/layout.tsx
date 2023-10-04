import { type ReactNode } from 'react'
import { Sidebar } from './_components/sidebar'
import { Navbar } from './_components/navbar'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-full">
      <header className="fixed inset-y-0 z-50 h-20 w-full md:pl-56">
        <Navbar />
      </header>
      <aside className="fixed inset-y-0 z-50 hidden h-full w-56 flex-col md:flex">
        <Sidebar />
      </aside>
      <main className="h-full pt-20 md:pl-56">{children}</main>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/search-input'

export function NavbarRoutes() {
  const pathname = usePathname()

  const isTeachPage = pathname.startsWith('/teacher')
  const isCoursePage = pathname.includes('/courses')
  const isSearchPage = pathname === '/search'

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="ml-auto flex gap-x-2">
        {isTeachPage || isCoursePage ? (
          <Button asChild size={'sm'} variant={'ghost'}>
            <Link href={'/'}>
              <LogOut size={16} className="mr-2" />
              Exit
            </Link>
          </Button>
        ) : (
          <Button asChild size={'sm'} variant={'ghost'}>
            <Link href={'/teacher/courses'}>Teacher mode</Link>
          </Button>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  )
}

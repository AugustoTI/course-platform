'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import qs from 'query-string'

export function SearchInput() {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const currentCategoryId = searchParams.get('categoryId')

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debouncedValue,
          categoryId: currentCategoryId,
        },
      },
      { skipEmptyString: true, skipNull: true },
    )

    router.push(url)
  }, [currentCategoryId, debouncedValue, pathname, router])

  return (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-3 text-slate-600" />
      <Input
        onChange={(event) => setValue(event.target.value)}
        className="w-full rounded-full bg-slate-100 pl-9 focus-visible:ring-slate-200 md:w-[300px]"
        placeholder="Search for a course"
      />
    </div>
  )
}

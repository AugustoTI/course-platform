'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type IconType } from 'react-icons'
import qs from 'query-string'
import { cn } from '@/lib/utils'

interface CategoryItemProps {
  label: string
  icon?: IconType
  value?: string
}

export function CategoryItem({ label, icon: Icon, value }: CategoryItemProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategoryId = searchParams.get('categoryId')
  const currentTitle = searchParams.get('title')

  const isSelected = currentCategoryId === value

  const handleClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true },
    )

    router.push(url)
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center gap-x-1.5 rounded-full border border-slate-200 px-3 py-2 text-sm transition hover:border-sky-700',
        isSelected && 'border-sky-700 bg-sky-200/20 text-sky-800',
      )}
    >
      {Icon && <Icon size={20} />}
      <span className="truncate">{label}</span>
    </button>
  )
}

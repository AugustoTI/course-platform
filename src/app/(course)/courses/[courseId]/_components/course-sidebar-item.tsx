'use client'

import { cn } from '@/lib/utils'
import { CheckCircle, Lock, PlayCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface CourseSidebarItemProps {
  label: string
  id: string
  courseId: string
  isCompleted: boolean
  isLocked: boolean
}

export function CourseSidebarItem(props: CourseSidebarItemProps) {
  const pathname = usePathname()

  const Icon = props.isLocked ? Lock : props.isCompleted ? CheckCircle : PlayCircle
  const isActive = pathname.includes(props.id)

  return (
    <Link
      href={`/courses/${props.courseId}/chapters/${props.id}`}
      className={cn(
        'flex items-center gap-x-2 pl-6 text-sm font-medium text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-600',
        isActive &&
          'bg-slate-200/20 text-slate-700 hover:bg-slate-200/20 hover:text-slate-700',
        props.isCompleted && 'text-emerald-700 hover:text-emerald-700',
        props.isCompleted && isActive && 'bg-emerald-200/20',
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            'text-slate-500',
            isActive && 'text-slate-700',
            props.isCompleted && 'text-emerald-700',
          )}
        />
        {props.label}
      </div>
      <div
        className={cn(
          'ml-auto h-full border-2 border-slate-700 opacity-0 transition-all',
          isActive && 'opacity-100',
          props.isCompleted && 'border-emerald-700',
        )}
      ></div>
    </Link>
  )
}

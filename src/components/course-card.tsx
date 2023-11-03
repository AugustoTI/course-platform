import Image from 'next/image'
import Link from 'next/link'
import { IconBadge } from './icon-badge'
import { BookOpen } from 'lucide-react'
import { formatPrice } from '@/lib/format'
import { CourseProgress } from './course-progress'

interface CourseCardProps {
  id: string
  title: string
  imageUrl: string
  chapterLength: number
  price: number
  progress: number | null
  category: string
}

export function CourseCard(props: CourseCardProps) {
  return (
    <Link href={`/courses/${props.id}`}>
      <div className="group h-full overflow-hidden rounded-lg border p-3 transition hover:shadow-sm">
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image fill className="object-cover" alt={props.title} src={props.imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <h2 className="line-clamp-2 text-lg font-medium transition group-hover:text-sky-700 md:text-base">
            {props.title}
          </h2>
          <p className="text-xs text-muted-foreground">{props.category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {props.chapterLength} {props.chapterLength === 1 ? 'Chapter' : 'Chapters'}
              </span>
            </div>
          </div>
          {props.progress !== null ? (
            <CourseProgress
              value={props.progress}
              size="sm"
              variant={props.progress === 100 ? 'success' : 'default'}
            />
          ) : (
            <p className="text-md font-medium text-slate-700 md:text-sm">
              {formatPrice(props.price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

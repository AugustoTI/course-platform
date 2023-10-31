import { type CourseWithProgressWithCategory } from '@/actions/get-courses'
import { CourseCard } from '@/components/course-card'

interface CoursesListProps {
  items: CourseWithProgressWithCategory[]
}

export function CoursesList({ items }: CoursesListProps) {
  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chapterLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name as string}
          />
        ))}
      </ul>
      {items.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No courses found.
        </p>
      )}
    </div>
  )
}

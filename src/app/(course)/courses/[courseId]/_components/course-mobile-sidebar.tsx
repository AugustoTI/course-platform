import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { type Chapter, type Course, type UserProgress } from '@prisma/client'
import { Menu } from 'lucide-react'
import { CourseSidebar } from './course-sidebar'

interface ChapterWithUserProgress extends Chapter {
  userProgress: UserProgress[] | null
}

interface CourseWithChapters extends Course {
  chapters: ChapterWithUserProgress[]
}

interface CourseMobileSidebarProps {
  progressCount: number
  course: CourseWithChapters
}

export function CourseMobileSidebar({ course, progressCount }: CourseMobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 transition hover:opacity-75 md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-72 bg-white p-0">
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  )
}

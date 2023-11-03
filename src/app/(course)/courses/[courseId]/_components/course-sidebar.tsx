import { db } from '@/lib/database'
import { auth } from '@clerk/nextjs'
import { type Course, type Chapter, type UserProgress } from '@prisma/client'
import { redirect } from 'next/navigation'
import { CourseSidebarItem } from './course-sidebar-item'
import { CourseProgress } from '@/components/course-progress'

interface ChapterWithUserProgress extends Chapter {
  userProgress: UserProgress[] | null
}

interface CourseWithChapters extends Course {
  chapters: ChapterWithUserProgress[]
}

interface CourseSidebarProps {
  progressCount: number
  course: CourseWithChapters
}

export async function CourseSidebar({ course, progressCount }: CourseSidebarProps) {
  const { userId } = auth()

  if (!userId) return redirect('/')

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: { userId, courseId: course.id },
    },
  })

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r shadow-sm">
      <div className="flex flex-col border-b p-8">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <ul className="flex w-full flex-col">
        {course.chapters.map((chapter) => (
          <li key={chapter.id}>
            <CourseSidebarItem
              id={chapter.id}
              label={chapter.title}
              isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              courseId={course.id}
              isLocked={!chapter.isFree && !purchase}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

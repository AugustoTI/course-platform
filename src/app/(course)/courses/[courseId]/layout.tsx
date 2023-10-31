import { getProgress } from '@/actions/get-progress'
import { db } from '@/lib/database'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { type ReactNode } from 'react'
import { CourseSidebar } from './_components/course-sidebar'
import { CourseNavbar } from './_components/course-navbar'

interface CourseLayoutProps {
  children: ReactNode
  params: { courseId: string }
}

export default async function CourseLayout({ children, params }: CourseLayoutProps) {
  const { userId } = auth()

  if (!userId) return redirect('/')

  const course = await db.course.findUnique({
    where: { id: params.courseId },
    include: {
      chapters: {
        where: { isPublished: true },
        include: {
          userProgress: {
            where: { userId },
          },
        },
        orderBy: { position: 'asc' },
      },
    },
  })

  if (!course) return redirect('/')

  const progressCount = await getProgress(userId, course.id)

  return (
    <div className="h-full">
      <header className="fixed inset-y-0 z-50 h-20 w-full md:pl-80">
        <CourseNavbar course={course} progressCount={progressCount} />
      </header>
      <aside className="fixed inset-y-0 z-50 hidden h-full w-80 flex-col md:flex">
        <CourseSidebar course={course} progressCount={progressCount} />
      </aside>
      <main className="h-full pt-20 md:pl-80">{children}</main>
    </div>
  )
}

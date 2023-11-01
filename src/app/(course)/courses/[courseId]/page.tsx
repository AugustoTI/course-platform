import { db } from '@/lib/database'
import { redirect } from 'next/navigation'

interface CoursePageProps {
  params: { courseId: string }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await db.course.findUnique({
    where: { id: params.courseId },
    include: {
      chapters: {
        where: { isPublished: true },
        orderBy: { position: 'asc' },
      },
    },
  })

  if (!course) return redirect('/')

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`)
}

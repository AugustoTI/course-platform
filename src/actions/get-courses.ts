import { db } from '@/lib/database'
import { type Category, type Course } from '@prisma/client'
import { getProgress } from './get-progress'

export interface CourseWithProgressWithCategory extends Course {
  category: Category | null
  chapters: { id: string }[]
  progress: number | null
}

interface GetCourses {
  userId: string
  title?: string
  categoryId?: string
}

export async function getCourses({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: { contains: title },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: { isPublished: true },
          select: { id: true },
        },
        purchases: {
          where: { userId },
        },
      },
      orderBy: { createAt: 'desc' },
    })

    const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
      courses.map(async (course) => {
        if (course.purchases.length === 0) {
          return {
            ...course,
            progress: null,
          }
        }

        const progressPercentage = await getProgress(userId, course.id)

        return {
          ...course,
          progress: progressPercentage,
        }
      }),
    )

    return coursesWithProgress
  } catch (error) {
    console.log('[GET_COURSES]', error)
    return []
  }
}

import { db } from '@/lib/database'
import { type Category, type Chapter, type Course } from '@prisma/client'
import { getProgress } from './get-progress'

interface CourseWithProgressWithCategory extends Course {
  category: Category
  chapters: Chapter[]
  progress: number | null
}

interface DashboardCourses {
  completedCourses: CourseWithProgressWithCategory[]
  coursesInProgress: CourseWithProgressWithCategory[]
}

export async function getDashboardCourses(userId: string): Promise<DashboardCourses> {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: { userId },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: { isPublished: true },
            },
          },
        },
      },
    })

    const courses = purchasedCourses.map(
      (purchased) => purchased.course,
    ) as CourseWithProgressWithCategory[]

    for (const course of courses) {
      const progress = await getProgress(userId, course.id)
      course['progress'] = progress
    }

    const completedCourses = courses.filter((course) => course.progress === 100)
    const coursesInProgress = courses.filter((course) => (course.progress ?? 0) < 100)

    return {
      completedCourses,
      coursesInProgress,
    }
  } catch (error) {
    console.log('[GET_DASHBOARD_COURSES]', error)
    return {
      completedCourses: [],
      coursesInProgress: [],
    }
  }
}

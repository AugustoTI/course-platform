import { db } from '@/lib/database'

export async function getProgress(userId: string, courseId: string): Promise<number> {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: { courseId, isPublished: true },
      select: { id: true },
    })

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id)

    const validCompleteChapters = await db.userProgress.count({
      where: {
        userId,
        chapterId: { in: publishedChapterIds },
        isCompleted: true,
      },
    })

    const progressPercentage = (validCompleteChapters / publishedChapterIds.length) * 100

    return progressPercentage
  } catch (error) {
    console.log('[GET_PROGRESS]', error)
    return 0
  }
}

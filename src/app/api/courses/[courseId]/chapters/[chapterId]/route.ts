import { db } from '@/lib/database'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

interface PatchProps {
  params: { courseId: string; chapterId: string }
}

export async function PATCH(req: Request, { params }: PatchProps) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('unauthorized', { status: 401 })

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    })

    if (!ownCourse) return new NextResponse('unauthorized', { status: 401 })

    const values = await req.json()

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    })

    return NextResponse.json(chapter)
  } catch (error) {
    console.log('[CHAPTER_ID]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

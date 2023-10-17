import { db } from '@/lib/database'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

interface PatchProps {
  params: { courseId: string }
}

export async function PUT(req: Request, { params }: PatchProps) {
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

    const { list } = await req.json()

    for (const item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      })
    }

    return new NextResponse('Success', { status: 200 })
  } catch (error) {
    console.log('[REORDER]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

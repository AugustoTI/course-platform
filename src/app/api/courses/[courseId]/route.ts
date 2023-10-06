import { db } from '@/lib/database'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

interface PatchProps {
  params: { courseId: string }
}

export async function PATCH(req: Request, { params }: PatchProps) {
  try {
    const { userId } = auth()
    const values = await req.json()

    if (!userId) {
      return new NextResponse('unauthorized', { status: 401 })
    }

    const course = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: { ...values },
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log('[COURSE_ID]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

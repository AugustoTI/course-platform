import { db } from '@/lib/database'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

interface DeleteProps {
  params: { courseId: string; attachmentId: string }
}

export async function DELETE(req: Request, { params }: DeleteProps) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('unauthorized', { status: 401 })

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    })

    if (!courseOwner) return new NextResponse('unauthorized', { status: 401 })

    const attachment = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
      },
    })

    return NextResponse.json(attachment)
  } catch (error) {
    console.log('[ATTACHMENT_ID]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

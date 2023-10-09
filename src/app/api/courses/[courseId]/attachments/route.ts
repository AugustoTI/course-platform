import { db } from '@/lib/database'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

interface PostProps {
  params: { courseId: string }
}

export async function POST(req: Request, { params }: PostProps) {
  try {
    const { userId } = auth()
    const { url } = (await req.json()) as { url: string }

    if (!userId) return new NextResponse('unauthorized', { status: 401 })

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    })

    if (!courseOwner) return new NextResponse('unauthorized', { status: 401 })

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split('/').pop()!,
        courseId: params.courseId,
      },
    })

    return NextResponse.json(attachment)
  } catch (error) {
    console.log('[COURSE_ID_ATTACHMENTS]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

import { IconBadge } from '@/components/icon-badge'
import { db } from '@/lib/database'
import { auth } from '@clerk/nextjs'
import { ArrowLeft, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ChapterTitleForm } from './_components/chapter-title-form'

interface ChapterPageProps {
  params: { chapterId: string; courseId: string }
}

export default async function ChapterPage({
  params: { chapterId, courseId },
}: ChapterPageProps) {
  const { userId } = auth()

  if (!userId) return redirect('/')

  const chapter = await db.chapter.findUnique({
    where: { id: chapterId, courseId },
    include: { muxData: true },
  })

  if (!chapter) return redirect('/')

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl]
  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/teacher/courses/${courseId}`}
            className="mb-6 flex items-center gap-2 text-sm transition hover:opacity-75"
          >
            <ArrowLeft size={16} />
            Back to course setup
          </Link>
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Chapter creation</h1>
              <span className="text-sm text-slate-700">
                Complete all fields {completionText}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your chapter</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter.title}
              courseId={courseId}
              chapterId={chapterId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

import { getChapter } from '@/actions/get-chapter'
import { Banner } from '@/components/banner'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { VideoPlayer } from './_components/video-player'
import { CourseEnrollButton } from './_components/course-enroll-button'
import { Separator } from '@/components/ui/separator'
import { Preview } from '@/components/preview'
import { File } from 'lucide-react'

interface ChapterPageProps {
  params: { courseId: string; chapterId: string }
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { userId } = auth()

  if (!userId) return redirect('/')

  const { chapter, course, purchase, userProgress, nextChapter, muxData, attachments } =
    await getChapter({
      userId,
      chapterId: params.chapterId,
      courseId: params.courseId,
    })

  if (!chapter || !course) return redirect('/')

  const isLocked = !chapter.isFree && !purchase
  const completeOnEnd = !!purchase && !userProgress?.isCompleted

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label="You already completed this chapter." variant="success" />
      )}
      {isLocked && (
        <Banner
          label="You need to purchase this course to watch this chapter."
          variant="warning"
        />
      )}

      <div className="mx-auto flex max-w-4xl flex-col pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId as string}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="flex flex-col items-center justify-between p-4 md:flex-row">
            <h2 className="mb-2 text-2xl font-semibold">{chapter.title}</h2>
            {purchase ? (
              <div>{/* TODO: Add CourseProgressButton */}</div>
            ) : (
              <CourseEnrollButton courseId={params.courseId} price={course.price!} />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    rel="noreferrer"
                    className="flex w-full items-center rounded-md border bg-sky-200 p-3 text-sky-700 hover:underline"
                  >
                    <File />
                    <span className="line-clamp-1">{attachment.name}</span>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

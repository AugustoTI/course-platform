'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Pencil, PlusCircle, Video } from 'lucide-react'
import { z } from 'zod'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { FileUploader } from '@/components/file-upload'
import { MuxData } from '@prisma/client'
import MuxPlayer from '@mux/mux-player-react'

interface ChapterVideoFormProps {
  initialData: MuxData | null
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  videoUrl: z.string().nonempty(),
})

type FormSchemaFields = z.infer<typeof formSchema>

export function ChapterVideoForm({
  courseId,
  chapterId,
  initialData,
}: ChapterVideoFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const onSubmit = async (fields: FormSchemaFields) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, fields)
      toast.success('Chapter updated 🥳')
      toggleEdit()
      router.refresh()
    } catch {
      toast.error('Something went wrong... 😢')
    }
  }

  const toggleEdit = () => setIsEditing((prevState) => !prevState)

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Chapter video
        <Button variant={'ghost'} className="gap-2" onClick={toggleEdit}>
          {isEditing && 'Cancel'}
          {!isEditing && initialData && (
            <>
              <Pencil size={16} />
              Edit video
            </>
          )}
          {!isEditing && !initialData && (
            <>
              <PlusCircle size={16} />
              Add a video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData ? (
          <div className="mt-2 flex h-60 items-center justify-center rounded-md bg-slate-200">
            <Video className="text-slate-500" size={40} />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <MuxPlayer playbackId={initialData.playbackId || ''} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUploader
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url })
              }
            }}
          />
          <p className="mt-4 text-xs text-muted-foreground">
            Upload this chapter&apos;s video
          </p>
        </div>
      )}
      {initialData && !isEditing && (
        <p className="mt-2 text-xs text-muted-foreground">
          Videos can take a few minutes to process. Refresh the page if video does not
          appear.
        </p>
      )}
    </div>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { File, Loader2, PlusCircle, X } from 'lucide-react'
import { z } from 'zod'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { FileUploader } from '@/components/file-upload'
import { Attachment } from '@prisma/client'

interface AttachmentFormProps {
  initialData: Attachment[]
  courseId: string
}

const formSchema = z.object({
  url: z.string().nonempty(),
})

type FormSchemaFields = z.infer<typeof formSchema>

export function AttachmentForm({ courseId, initialData }: AttachmentFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = async (fields: FormSchemaFields) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, fields)
      toast.success('Course updated 🥳')
      toggleEdit()
      router.refresh()
    } catch {
      toast.error('Something went wrong... 😢')
    }
  }

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
      toast.success('Attachment deleted')
      router.refresh()
    } catch {
      toast.error('Something went wrong... 😢')
    } finally {
      setDeletingId(null)
    }
  }

  const toggleEdit = () => setIsEditing((prevState) => !prevState)

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Course attachments
        <Button variant={'ghost'} className="gap-2" onClick={toggleEdit}>
          {isEditing && 'Cancel'}
          {!isEditing && (
            <>
              <PlusCircle size={16} />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.length === 0 && (
            <p className="mt-2 text-sm italic text-slate-500">No attachment yet</p>
          )}
          {initialData.length > 0 && (
            <div className="space-y-2">
              {initialData.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex w-full items-center gap-2 rounded-md border border-sky-200 bg-sky-100 p-3 text-sky-700"
                >
                  <File size={16} />
                  <p className="line-clamp-1 text-xs">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <i className="ml-auto">
                      <Loader2 size={16} className="animate-spin" />
                    </i>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto transition hover:opacity-75"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUploader
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url })
              }
            }}
          />
          <p className="mt-4 text-xs text-muted-foreground">
            Add anything your students might need to complete the course.
          </p>
        </div>
      )}
    </div>
  )
}

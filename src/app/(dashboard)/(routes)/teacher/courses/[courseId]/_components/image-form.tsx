'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import { z } from 'zod'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { FileUploader } from '@/components/file-upload'

interface ImageFormProps {
  initialData: string | null
  courseId: string
}

const formSchema = z.object({
  imageUrl: z.string().nonempty('Description is required'),
})

type FormSchemaFields = z.infer<typeof formSchema>

export function ImageForm({ courseId, initialData }: ImageFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const onSubmit = async (fields: FormSchemaFields) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, fields)
      toast.success('Course updated 🥳')
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
        Course image
        <Button variant={'ghost'} className="gap-2" onClick={toggleEdit}>
          {isEditing && 'Cancel'}
          {!isEditing && initialData && (
            <>
              <Pencil size={16} />
              Edit image
            </>
          )}
          {!isEditing && !initialData && (
            <>
              <PlusCircle size={16} />
              Add an image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData ? (
          <div className="mt-2 flex h-60 items-center justify-center rounded-md bg-slate-200">
            <ImageIcon className="text-slate-500" size={40} />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <Image
              alt="Upload"
              fill
              className="rounded-md object-cover"
              src={initialData || ''}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUploader
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url })
              }
            }}
          />
          <p className="mt-4 text-xs text-muted-foreground">
            16:9 aspect ratio recommend
          </p>
        </div>
      )}
    </div>
  )
}

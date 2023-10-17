'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Pencil } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormItem, UncontrolledFormMessage } from '@/components/ui/form'

interface ChapterTitleFormProps {
  initialData: string
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  title: z.string().nonempty(),
})

type FormSchemaFields = z.infer<typeof formSchema>

export function ChapterTitleForm({
  courseId,
  chapterId,
  initialData,
}: ChapterTitleFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const form = useForm<FormSchemaFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData,
    },
  })

  const { isSubmitting, isValid, errors } = form.formState
  const { register, handleSubmit } = form

  const onSubmit: SubmitHandler<FormSchemaFields> = async (fields) => {
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
        Chapter Title
        <Button variant={'ghost'} className="gap-2" onClick={toggleEdit}>
          {isEditing ? (
            'Cancel'
          ) : (
            <>
              <Pencil size={16} />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="mt-2 text-sm">{initialData}</p>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormItem>
              <Input
                {...register('title')}
                disabled={isSubmitting}
                placeholder="e.g. 'Introduction to the course'"
              />
              <UncontrolledFormMessage message={errors.title?.message} />
            </FormItem>
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

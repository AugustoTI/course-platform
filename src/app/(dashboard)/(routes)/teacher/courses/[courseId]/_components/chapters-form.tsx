'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PlusCircle } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { Form, FormItem } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Chapter, Course } from '@prisma/client'

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] }
  courseId: string
}

const formSchema = z.object({
  title: z.string().nonempty(),
})

type FormSchemaFields = z.infer<typeof formSchema>

export function ChaptersForm({ courseId, initialData }: ChaptersFormProps) {
  const [isCreating, setIsCreating] = useState(false)

  const router = useRouter()

  const form = useForm<FormSchemaFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })

  const { isSubmitting, isValid } = form.formState
  const { register, handleSubmit } = form

  const onSubmit: SubmitHandler<FormSchemaFields> = async (fields) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, fields)
      toast.success('Chapter created 🥳')
      toggleCreating()
      router.refresh()
    } catch {
      toast.error('Something went wrong... 😢')
    }
  }

  const toggleCreating = () => {
    setIsCreating((prevState) => !prevState)
  }

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Course chapters
        <Button variant={'ghost'} className="gap-2" onClick={toggleCreating}>
          {isCreating ? (
            'Cancel'
          ) : (
            <>
              <PlusCircle size={16} />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormItem>
              <Input
                {...register('title')}
                disabled={isSubmitting}
                placeholder="e.g. 'Introduction to the course'"
              />
            </FormItem>
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            'mt-2 text-sm',
            !initialData.chapters.length && 'italic text-slate-500',
          )}
        >
          {!initialData.chapters.length && 'No chapters'}
        </div>
      )}
      {!isCreating && (
        <p className="mt-4 text-xs text-muted-foreground">
          Drag and drop to renders the chapters
        </p>
      )}
    </div>
  )
}

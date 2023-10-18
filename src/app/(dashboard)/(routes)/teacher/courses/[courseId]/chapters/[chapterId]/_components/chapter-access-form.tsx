'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Pencil } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'

interface ChapterAccessFormProps {
  initialData: boolean
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
})

type FormSchemaFields = z.infer<typeof formSchema>

export function ChapterAccessForm({
  courseId,
  initialData,
  chapterId,
}: ChapterAccessFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const form = useForm<FormSchemaFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!initialData,
    },
  })

  const { isSubmitting, isValid } = form.formState
  const { handleSubmit } = form

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
        Chapter access
        <Button variant={'ghost'} className="gap-2" onClick={toggleEdit}>
          {isEditing ? (
            'Cancel'
          ) : (
            <>
              <Pencil size={16} />
              Edit access
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn('mt-2 text-sm', !initialData && 'italic text-slate-500')}>
          {initialData ? 'This chapter is free for preview' : 'This chapter is not free'}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormDescription className="my-1 leading-none">
                    Check this box if you want to make this chapter free to preview
                  </FormDescription>
                </FormItem>
              )}
            />

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

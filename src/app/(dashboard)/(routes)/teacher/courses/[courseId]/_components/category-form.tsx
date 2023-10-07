'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Pencil } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Combobox, type ComboboxProps } from '@/components/ui/combobox'

interface CategoryFormProps {
  initialData: string | null
  courseId: string
  options: ComboboxProps['options']
}

const formSchema = z.object({
  categoryId: z.string().nonempty(),
})

type FormSchemaFields = z.infer<typeof formSchema>

export function CategoryForm({ courseId, initialData, options }: CategoryFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const form = useForm<FormSchemaFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData || '',
    },
  })

  const { isSubmitting, isValid } = form.formState
  const { handleSubmit } = form

  const onSubmit: SubmitHandler<FormSchemaFields> = async (fields) => {
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

  const selectOption = options.find((option) => option.value === initialData)

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Course category
        <Button variant={'ghost'} className="gap-2" onClick={toggleEdit}>
          {isEditing ? (
            'Cancel'
          ) : (
            <>
              <Pencil size={16} />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn('mt-2 text-sm', !initialData && 'italic text-slate-500')}>
          {selectOption?.label || 'No category'}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Combobox options={...options} {...field} />
                    </FormControl>
                  </FormItem>
                )
              }}
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

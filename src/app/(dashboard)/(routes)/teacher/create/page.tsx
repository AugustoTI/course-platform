'use client'

import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'

import {
  Form,
  FormDescription,
  FormItem,
  FormLabel,
  UncontrolledFormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import toast from 'react-hot-toast'

const formSchema = z.object({
  title: z.string().nonempty('Title is required'),
})

type FormSchemaFields = z.infer<typeof formSchema>

export default function CreatePage() {
  const router = useRouter()
  const form = useForm<FormSchemaFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })

  const { isValid, isSubmitting, errors } = form.formState
  const { register, handleSubmit } = form

  const onSubmit: SubmitHandler<FormSchemaFields> = async (fields) => {
    try {
      const response = await axios.post('/api/course', fields)
      router.push(`/teacher/courses/${response.data.id}`)
    } catch {
      toast.error('Something went wrong... 😟')
    }
  }

  return (
    <div className="mx-auto flex h-full max-w-5xl p-6 md:items-center md:justify-center">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course ? Don&apos;t worry, you can change this
          later.
        </p>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
            <FormItem>
              <FormLabel htmlFor="title">Course Title</FormLabel>
              <Input
                {...register('title')}
                id="title"
                disabled={isSubmitting}
                placeholder="e.g. 'Advanced web development'"
              />
              <FormDescription>What will you teach in this course ?</FormDescription>
              <UncontrolledFormMessage message={errors.title?.message} />
            </FormItem>
            <div className="flex items-center gap-x-2">
              <Button asChild variant={'ghost'}>
                <Link href={'/'}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

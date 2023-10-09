import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'
import { db } from '@/lib/database'
import { IconBadge } from '@/components/icon-badge'
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from 'lucide-react'
import { TitleForm } from './_components/title-form'
import { DescriptionForm } from './_components/description-form'
import { ImageForm } from './_components/image-form'
import { CategoryForm } from './_components/category-form'
import { PriceForm } from './_components/price-form'
import { AttachmentForm } from './_components/attachment-form'

interface CourseIdPage {
  params: { courseId: string }
}

export default async function CourseIdPage({ params }: CourseIdPage) {
  const { userId } = auth()

  if (!userId) return redirect('/')

  const course = await db.course.findUnique({
    where: { id: params.courseId },
    include: {
      attachments: {
        orderBy: { createAt: 'desc' },
      },
    },
  })

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  if (!course) return redirect('/')

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialData={course.title} courseId={course.id} />
          <DescriptionForm initialData={course.description} courseId={course.id} />
          <ImageForm initialData={course.imageUrl} courseId={course.id} />
          <CategoryForm
            initialData={course.categoryId}
            courseId={course.id}
            options={categories.map(({ id, name }) => ({ label: name, value: id }))}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Course chapters</h2>
            </div>
            <div>TODO: Chapters</div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl">Sell your course</h2>
            </div>
            <PriceForm initialData={course.price} courseId={course.id} />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl">Resources & Attachments</h2>
            </div>
            <AttachmentForm initialData={course.attachments} courseId={course.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
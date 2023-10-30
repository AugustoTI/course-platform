import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/database'

export default async function CoursesPage() {
  const { userId } = auth()

  if (!userId) return redirect('/')

  const courses = await db.course.findMany({
    where: { userId },
    orderBy: { createAt: 'desc' },
  })

  return (
    <div className="p-4 md:p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  )
}

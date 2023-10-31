import { db } from '@/lib/database'
import { Categories } from './_components/categories'
import { SearchInput } from '@/components/search-input'
import { getCourses } from '@/actions/get-courses'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { CoursesList } from '@/components/courses-list'

interface SearchPageProps {
  searchParams: { title: string; categoryId: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { userId } = auth()

  if (!userId) return redirect('/')

  const categories = await db.category.findMany({
    orderBy: { name: 'asc' },
  })

  const courses = await getCourses({ userId, ...searchParams })

  return (
    <>
      <div className="block p-6 md:mb-0 md:hidden">
        <SearchInput />
      </div>
      <div className="space-y-4 p-4 md:p-6">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  )
}

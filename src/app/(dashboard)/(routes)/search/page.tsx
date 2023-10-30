import { db } from '@/lib/database'
import { Categories } from './_components/categories'

export default async function SearchPage() {
  const categories = await db.category.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <div className="p-4 md:p-6">
      <Categories items={categories} />
    </div>
  )
}

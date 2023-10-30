import { db } from '@/lib/database'
import { Categories } from './_components/categories'
import { SearchInput } from '@/components/search-input'

export default async function SearchPage() {
  const categories = await db.category.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <>
      <div className="block p-6 md:mb-0 md:hidden">
        <SearchInput />
      </div>
      <div className="p-4 md:p-6">
        <Categories items={categories} />
      </div>
    </>
  )
}

'use client'

import { type Category } from '@prisma/client'
import { type IconType } from 'react-icons'

import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcVoicePresentation,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
  FcLandscape,
  FcCommandLine,
} from 'react-icons/fc'
import { CategoryItem } from './category-item'

const iconMap: Record<Category['name'], IconType> = {
  'Computer Science': FcMultipleDevices,
  Music: FcMusic,
  Fitness: FcSportsMode,
  Filming: FcFilmReel,
  Engineering: FcEngineering,
  Accounting: FcSalesPerformance,
  Photography: FcOldTimeCamera,
  'Software Engineering': FcCommandLine,
  Languages: FcVoicePresentation,
  'Art and drawing': FcLandscape,
}

interface CategoriesProps {
  items: Category[]
}

export function Categories({ items }: CategoriesProps) {
  return (
    <ul className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <li key={item.id}>
          <CategoryItem icon={iconMap[item.name]} label={item.name} value={item.id} />
        </li>
      ))}
    </ul>
  )
}

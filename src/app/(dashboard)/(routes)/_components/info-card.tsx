import { IconBadge } from '@/components/icon-badge'
import { type LucideIcon } from 'lucide-react'

interface InfoCardProps {
  numberOfItems: number
  label: string
  icon: LucideIcon
  variant?: 'default' | 'success'
}

export function InfoCard({ label, icon: Icon, numberOfItems, variant }: InfoCardProps) {
  return (
    <div className="flex items-center gap-x-2 rounded-md border p-3">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">
          {numberOfItems} {numberOfItems === 1 ? 'Course' : 'Courses'}
        </p>
      </div>
    </div>
  )
}

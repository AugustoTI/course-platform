import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface CourseProgressProps {
  value: number
  variant?: 'default' | 'success'
  size?: 'default' | 'sm'
}

const colorByVariants = {
  default: 'text-sky-700',
  success: 'text-emerald-700',
}

const sizeByVariant = {
  default: 'text-sm',
  sm: 'text-xs',
}

export function CourseProgress({ value, variant, size }: CourseProgressProps) {
  return (
    <>
      <Progress className="h-2" value={value} variant={variant} />
      <p
        className={cn(
          'mt-2 font-medium text-sky-700',
          colorByVariants[variant || 'default'],
          sizeByVariant[size || 'default'],
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </>
  )
}

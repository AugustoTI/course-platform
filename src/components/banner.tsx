import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertTriangle, CheckCircleIcon } from 'lucide-react'

const bannerVariants = cva(
  'flex w-full flex-col items-center gap-2 border p-4 text-center text-sm sm:flex-row',
  {
    variants: {
      variant: {
        warning: 'border-yellow-300 bg-yellow-200/80 text-primary',
        success: 'border-emerald-800 bg-emerald-700 text-secondary',
      },
    },
    defaultVariants: {
      variant: 'warning',
    },
  },
)

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
}

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string
}

export function Banner({ label, variant }: BannerProps) {
  const Icon = iconMap[variant || 'warning']

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon size={16} />
      {label}
    </div>
  )
}

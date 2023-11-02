'use client'

import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'

interface CourseProgressButtonProps {
  courseId: string
  price: number
}

export function CourseEnrollButton({ price }: CourseProgressButtonProps) {
  return (
    <Button size="sm" className="w-full md:w-auto">
      Enroll for {formatPrice(price)}
    </Button>
  )
}

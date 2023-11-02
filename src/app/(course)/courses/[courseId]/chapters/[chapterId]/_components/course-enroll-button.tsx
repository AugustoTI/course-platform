'use client'

import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface CourseProgressButtonProps {
  courseId: string
  price: number
}

export function CourseEnrollButton({ price, courseId }: CourseProgressButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function onClick() {
    try {
      setIsLoading(true)

      const { data } = await axios.post(`/api/courses/${courseId}/checkout`)

      globalThis.location.assign(data.url)
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button size="sm" className="w-full md:w-auto" onClick={onClick} disabled={isLoading}>
      Enroll for {formatPrice(price)}
    </Button>
  )
}

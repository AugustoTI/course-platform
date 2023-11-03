'use client'

import { Button } from '@/components/ui/button'
import { useConfettiStore } from '@/hooks/use-confetti-store'
import axios from 'axios'
import { CheckCircle, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface CourseProgressButtonProps {
  chapterId: string
  courseId: string
  isCompleted?: boolean
  nextChapterId?: string
}

export function CourseProgressButton({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
}: CourseProgressButtonProps) {
  const router = useRouter()
  const onConfettiStart = useConfettiStore((store) => store.onOpen)
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: !isCompleted,
      })

      if (!isCompleted && !nextChapterId) onConfettiStart()

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
      }

      toast.success('Progress updated')
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const Icon = isCompleted ? XCircle : CheckCircle

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="w-full gap-x-2 md:w-auto"
      type="button"
      variant={isCompleted ? 'outline' : 'success'}
    >
      {isCompleted ? 'Not completed' : 'Mark as complete'}
      <Icon size={16} />
    </Button>
  )
}

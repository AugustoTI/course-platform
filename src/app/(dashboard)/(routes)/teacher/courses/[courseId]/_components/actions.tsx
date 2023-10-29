'use client'

import { ConfirmModal } from '@/components/modals/confirm-modal'
import { Button } from '@/components/ui/button'
import { useConfettiStore } from '@/hooks/use-confetti-store'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface ActionsProps {
  disabled: boolean
  courseId: string
  isPublished: boolean
}

export function Actions({ disabled, isPublished, courseId }: ActionsProps) {
  const router = useRouter()
  const onStartConfetti = useConfettiStore((store) => store.onOpen)
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`)
        toast.success('Course unpublished')
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`)
        toast.success('Course published')
        onStartConfetti()
      }
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/courses/${courseId}`)
      toast.success('Course deleted')
      router.refresh()
      router.push(`/teacher/courses/`)
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        size="sm"
        variant="outline"
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={disabled}>
          <Trash />
        </Button>
      </ConfirmModal>
    </div>
  )
}

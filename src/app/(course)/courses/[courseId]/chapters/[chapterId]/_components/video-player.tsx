'use client'

import { useConfettiStore } from '@/hooks/use-confetti-store'
import { cn } from '@/lib/utils'
import MuxPlayer from '@mux/mux-player-react'
import axios from 'axios'
import { Loader2, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface VideoPlayerProps {
  courseId: string
  chapterId: string
  playbackId: string
  nextChapterId?: string
  isLocked: boolean
  completeOnEnd: boolean
  title: string
}

export function VideoPlayer(props: VideoPlayerProps) {
  const [isReady, setIsReady] = useState(false)
  const router = useRouter()
  const onConfettiStart = useConfettiStore((store) => store.onOpen)

  const onEnd = async () => {
    try {
      if (props.completeOnEnd) {
        await axios.put(
          `/api/courses/${props.courseId}/chapters/${props.chapterId}/progress`,
          {
            isCompleted: true,
          },
        )
      }

      if (!props.nextChapterId) {
        onConfettiStart()
        router.refresh()
      }

      toast.success('Progress updated')
      router.refresh()

      if (props.nextChapterId) {
        router.push(`/courses/${props.courseId}/chapters/${props.nextChapterId}`)
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="relative aspect-video">
      {!isReady && !props.isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 size={32} className="animate-spin text-secondary" />
        </div>
      )}

      {props.isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-slate-800 text-secondary">
          <Lock size={32} />
          <p>This chapter is locked</p>
        </div>
      )}

      {!props.isLocked && (
        <MuxPlayer
          title={props.title}
          className={cn(!isReady && 'hidden')}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          playbackId={props.playbackId}
        />
      )}
    </div>
  )
}

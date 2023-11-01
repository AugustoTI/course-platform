'use client'

import { cn } from '@/lib/utils'
import MuxPlayer from '@mux/mux-player-react'
import { Loader2, Lock } from 'lucide-react'
import { useState } from 'react'

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
          onEnded={() => {}}
          autoPlay
          playbackId={props.playbackId}
        />
      )}
    </div>
  )
}

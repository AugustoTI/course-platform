'use client'

import { useConfettiStore } from '@/hooks/use-confetti-store'
import ReactConfetti from 'react-confetti'

export function ConfettiProvider() {
  const confetti = useConfettiStore()

  if (!confetti.isOpen) return null

  return (
    <ReactConfetti
      className="pointer-events-none z-[60]"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose()
      }}
    />
  )
}

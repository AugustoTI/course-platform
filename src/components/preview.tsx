'use client'

import 'react-quill/dist/quill.bubble.css'
import dynamic from 'next/dynamic'

interface PreviewProps {
  value: string
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export function Preview({ value }: PreviewProps) {
  return <ReactQuill theme="bubble" value={value} readOnly />
}

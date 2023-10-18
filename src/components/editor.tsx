'use client'

import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'

interface EditorProps {
  onChange(value: string): void
  value: string
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export function Editor({ value, onChange }: EditorProps) {
  return (
    <div className="bg-white">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  )
}

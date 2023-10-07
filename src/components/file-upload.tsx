'use client'

import { ourFileRouter } from '@/app/api/uploadthing/core'
import { UploadDropzone } from '@/lib/uploadthing'
import toast from 'react-hot-toast'

interface FileUploaderProps {
  onChange(url?: string): void
  endpoint: keyof typeof ourFileRouter
}

export function FileUploader({ endpoint, onChange }: FileUploaderProps) {
  return (
    <UploadDropzone
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`)
      }}
      endpoint={endpoint}
    />
  )
}

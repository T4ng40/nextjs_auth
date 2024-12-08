import { Loader2Icon } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen grid place-items-center p-4">
      <Loader2Icon className="animate-spin" />
    </div>
  )
}

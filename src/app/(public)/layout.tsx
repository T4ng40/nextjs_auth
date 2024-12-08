import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function PublicPages({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAuthenticated = Boolean(await auth())
  if (isAuthenticated) {
    return redirect('/')
  }

  return children
}

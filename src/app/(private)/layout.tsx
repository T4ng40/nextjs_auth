import { AuthProvider } from '@/contexts/AuthContext'
import { auth } from '@/lib/auth'

export default async function PrivatePages({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await auth()

  return <AuthProvider user={user}>{children}</AuthProvider>
}

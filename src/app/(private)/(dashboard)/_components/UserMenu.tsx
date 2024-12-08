'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'
import { CircleUser } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SignInButton } from './SignInButton'

export function UserMenu() {
  const router = useRouter()
  const { user } = useAuth()

  async function handleSignout() {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    await axios.post('/api/auth/sign-out')
    router.refresh()
  }

  if (!user) {
    return <SignInButton />
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>
          <strong>
            {user.firstName} {user.lastName}
          </strong>
          <small className="text-muted-foreground block">{user.email}</small>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleSignout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

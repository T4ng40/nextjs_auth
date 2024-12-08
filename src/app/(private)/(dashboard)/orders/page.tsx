'use client'

import { useAuth } from '@/hooks/useAuth'

export default function Orders() {
  const { isSignedIn } = useAuth()

  return (
    <div>
      {!isSignedIn && (
        <div className="w-full h-10 bg-secondary grid place-items-center rounded-lg text-sm text-secondary-foreground hover:bg-secondary/80">
          Login to view your orders
        </div>
      )}

      {isSignedIn && <div> Your orders</div>}
    </div>
  )
}

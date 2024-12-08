import { withAuth, withAuthorization } from '@/lib/withAuth'
import { NextResponse } from 'next/server'

export const GET = withAuth(
  withAuthorization(async () => {
    return NextResponse.json({
      orders: [1, 2, 3, 4]
    })
  })
)

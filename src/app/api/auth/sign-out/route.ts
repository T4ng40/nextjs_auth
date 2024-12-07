import { NextResponse } from 'next/server'

export async function POST() {
  const response = new NextResponse(null, { status: 204 })

  response.cookies.delete('accessToken')

  return response
}

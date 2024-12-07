import { env } from '@/config/env'
import { prismaClient } from '@/lib/prismaClient'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export async function POST(request: NextRequest) {
  const body = await request.json()

  const { success, error, data } = schema.safeParse(body)

  if (!success) {
    return NextResponse.json({ errors: error.issues }, { status: 400 })
  }

  const { email, password } = data

  const user = await prismaClient.user.findUnique({
    where: {
      email
    },
    select: {
      id: true,
      email: true,
      password: true
    }
  })

  if (!user) {
    return NextResponse.json({ errors: 'Invalid credentials' }, { status: 401 })
  }

  const isPasswordValid = await compare(password, user.password)

  if (!isPasswordValid) {
    return NextResponse.json({ errors: 'Invalid credentials' }, { status: 401 })
  }

  const accessToken = sign(
    {
      sub: user.id
    },
    env.jwtSecret,
    {
      expiresIn: '7d'
    }
  )

  const response = new NextResponse(null, { status: 204 })

  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
    sameSite: 'strict',
    secure: true
  })

  return response
}

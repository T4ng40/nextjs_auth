import { prismaClient } from '@/lib/prismaClient'
import { hash } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string()
})

export async function POST(request: NextRequest) {
  const body = await request.json()

  const { success, error, data } = schema.safeParse(body)

  if (!success) {
    return NextResponse.json({ errors: error.issues }, { status: 400 })
  }

  const { email, password, firstName, lastName } = data

  const emailAlreadyInUse = await prismaClient.user.findUnique({
    where: {
      email
    },
    select: {
      id: true
    }
  })

  if (emailAlreadyInUse) {
    return NextResponse.json(
      { errors: 'Email already in use' },
      { status: 409 }
    )
  }

  const hashedPassword = await hash(password, 12)

  await prismaClient.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName
    }
  })

  return new NextResponse(null, { status: 204 })
}

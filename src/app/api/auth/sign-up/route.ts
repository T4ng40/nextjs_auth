import { prismaClient } from '@/lib/prismaClient'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { hash } from 'bcryptjs'

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8)
})
export async function POST(request: NextRequest) {
  const body = await request.json()

  const { success, error, data } = schema.safeParse(body)

  if (!success) {
    return NextResponse.json({ errors: error.issues }, { status: 400 })
  }

  const { email, firstName, lastName, password } = data

  const emailAreadyInUse = await prismaClient.user.findUnique({
    where: {
      email
    },
    select: {
      id: true
    }
  })

  if (emailAreadyInUse) {
    return NextResponse.json(
      {
        error: 'Email already in use'
      },
      {
        status: 409
      }
    )
  }

  const hashedPassword = await hash(password, 12)

  await prismaClient.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: hashedPassword
    }
  })

  return new NextResponse(null, { status: 204 })
}

import { env } from '@/config/env'
import { User } from '@/entities/User'
import { JwtPayload, verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { prismaClient } from './prismaClient'

export function getAccessToken() {
  return cookies().get('accessToken')?.value
}

function verifyJwt(): null | string {
  const accessToken = getAccessToken()

  if (!accessToken) {
    return null
  }
  try {
    const { sub: userId } = verify(accessToken, env.jwtSecret) as JwtPayload

    if (!userId) {
      return null
    }

    return userId
  } catch {
    return null
  }
}

export function isAuthenticated() {
  return !!verifyJwt()
}

export async function auth(): Promise<null | User> {
  const userId = verifyJwt()

  if (!userId) {
    return null
  }

  try {
    const user = await prismaClient.user.findUnique({
      where: { id: userId }
    })

    return user
  } catch {
    return null
  }
}

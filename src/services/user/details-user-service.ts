import { compare } from 'bcryptjs'
import { prisma } from '../../lib/prisma'
import { sign } from 'jsonwebtoken'

interface DetailsUserServiceRequest {
  userId: string
}

export class DetailsUserService {
  async execute({ userId }: DetailsUserServiceRequest) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    return { user }
  }
}

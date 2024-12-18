import { compare } from 'bcryptjs'
import { prisma } from '../../lib/prisma'

interface AuthUserServiceRequest {
  email: string
  password: string
}

export class AuthUserService {
  async execute({ email, password }: AuthUserServiceRequest) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      throw new Error('User/password incorrect.')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('User/password incorrect.')
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }
}

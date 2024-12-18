import { hash } from 'bcryptjs'
import { prisma } from '../../lib/prisma'

interface UserRequest {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  async execute({ email, name, password }: UserRequest) {
    if (!email) {
      throw new Error('Email, is required.')
    }

    const userAlredyexists = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (userAlredyexists) {
      throw new Error('User alredy exists.')
    }

    const passwordHash = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
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

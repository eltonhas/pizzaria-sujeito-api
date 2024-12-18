import type { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserService } from '../../services/user/create-user-service'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
})

export class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = bodySchema.parse(request.body)

    const createUserService = new CreateUserService()

    const user = await createUserService.execute({ email, name, password })
    return reply.send(user)
  }
}

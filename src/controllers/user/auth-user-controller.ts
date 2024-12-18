import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthUserService } from '../../services/user/auth-user-service'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export class AuthUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = bodySchema.parse(request.body)

    const authUserService = new AuthUserService()

    const auth = await authUserService.execute({ email, password })

    const token = await reply.jwtSign(
      { name: auth.name, email: auth.email },
      {
        sign: {
          sub: auth.id,
        },
      }
    )

    return reply.send({ ...auth, token })
  }
}

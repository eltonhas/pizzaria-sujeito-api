import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { DetailsUserService } from '../../services/user/details-user-service'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export class DetailsUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.sub

    const detailsUserService = new DetailsUserService()

    const user = await detailsUserService.execute({ userId })

    return reply.send(user)
  }
}

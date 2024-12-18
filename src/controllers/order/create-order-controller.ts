import type { FastifyReply, FastifyRequest } from 'fastify'
import { CreateOrderService } from '../../services/order/create-order-service'
import { z } from 'zod'

const bodySchema = z.object({
  table: z.string().min(1),
  name: z.string().min(1).nullish(),
})

export class CreateOrderController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { table, name } = bodySchema.parse(request.body)

    const createOrderService = new CreateOrderService()

    const order = await createOrderService.execute({ table, name })

    return reply.send(order)
  }
}

import type { FastifyRequest, FastifyReply } from 'fastify'
import { FinishOrderService } from '../../services/order/finish-order-service'
import { z } from 'zod'

const bodySchema = z.object({
  orderId: z.string(),
})

export class FinishOrderController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { orderId } = bodySchema.parse(request.body)

    const finishOrderService = new FinishOrderService()

    const order = await finishOrderService.execute({ orderId })

    return reply.send(order)
  }
}

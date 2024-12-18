import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { SendOrderService } from '../../services/order/send-order-service'

const bodySchema = z.object({
  orderId: z.string(),
})

export class SendOrderController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { orderId } = bodySchema.parse(request.body)

    const sendOrderService = new SendOrderService()

    const order = await sendOrderService.execute({ orderId })

    return reply.send(order)
  }
}

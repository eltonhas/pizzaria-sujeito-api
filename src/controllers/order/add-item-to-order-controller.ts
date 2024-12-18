import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AddItemToOrderService } from '../../services/order/add-item-to-order-service'

const bodySchema = z.object({
  orderId: z.string(),
  productId: z.string(),
  amount: z.string(),
})

export class AddItemToOrderController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { orderId, productId, amount } = bodySchema.parse(request.body)

    const addItemToOrderService = new AddItemToOrderService()

    const order = await addItemToOrderService.execute({
      orderId,
      productId,
      amount,
    })

    return reply.send(order)
  }
}

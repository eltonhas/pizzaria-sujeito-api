import type { FastifyReply, FastifyRequest } from 'fastify'
import { DeleteOrderService } from '../../services/order/delete-order-service'
import { z } from 'zod'

const queryParamsSchema = z.object({ orderId: z.string() })

export class DeleteOrderController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { orderId } = queryParamsSchema.parse(request.query)
    const deleteOrderService = new DeleteOrderService()

    const order = await deleteOrderService.execute({ orderId: orderId })
    return reply.send(order)
  }
}

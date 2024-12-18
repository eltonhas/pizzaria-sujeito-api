import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { DetailsOrderService } from '../../services/order/details-order-service'

const queryParamsSchema = z.object({ orderId: z.string() })

export class DetailsOrderController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { orderId } = queryParamsSchema.parse(request.query)

    const detailsOrderService = new DetailsOrderService()

    const orders = await detailsOrderService.execute({ orderId })

    return reply.send(orders)
  }
}

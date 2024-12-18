import type { FastifyReply, FastifyRequest } from 'fastify'
import { RemoveItemToOrderService } from '../../services/order/remove-item-to-order-service'
import { z } from 'zod'

const queryParamsSchema = z.object({ itemId: z.string() })

export class RemoveItemToOrderController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { itemId } = queryParamsSchema.parse(request.query)

    const removeItemToOrderService = new RemoveItemToOrderService()

    const item = await removeItemToOrderService.execute({ itemId })

    return reply.send(item)
  }
}

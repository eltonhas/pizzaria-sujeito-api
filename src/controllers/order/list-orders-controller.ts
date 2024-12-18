import type { FastifyReply, FastifyRequest } from 'fastify'
import { ListOrdersService } from '../../services/order/list-orders-service'

export class ListOrdersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listOrdersService = new ListOrdersService()

    const orders = await listOrdersService.execute()

    return reply.send(orders)
  }
}

import type { FastifyRequest, FastifyReply } from 'fastify'
import { ListCategoriesService } from '../../services/category/list-categories-service'

export class ListCategoriesController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listCategoriesService = new ListCategoriesService()

    const categories = await listCategoriesService.execute()

    return reply.send(categories)
  }
}

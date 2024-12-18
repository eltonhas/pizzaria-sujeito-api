import type { FastifyReply, FastifyRequest } from 'fastify'
import { ListProductByCategoryService } from '../../services/product/list-product-by-category-service'
import { z } from 'zod'

const queryParamsSchema = z.object({
  categoryId: z.string(),
})

export class ListProductByCategoryController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { categoryId } = queryParamsSchema.parse(request.query)

    const listProductByCategoryService = new ListProductByCategoryService()

    const products = await listProductByCategoryService.execute({
      categoryId: categoryId,
    })

    return reply.send(products)
  }
}

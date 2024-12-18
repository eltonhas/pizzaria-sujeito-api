import type { FastifyReply, FastifyRequest } from 'fastify'
import { CreateCategoryService } from '../../services/category/create-category-service'
import { z } from 'zod'

const bodySchema = z.object({ name: z.string().min(1) })

export class CreateCategoryController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name } = bodySchema.parse(request.body)

    const createCategoryService = new CreateCategoryService()

    const category = await createCategoryService.execute({ name })

    return reply.send(category)
  }
}

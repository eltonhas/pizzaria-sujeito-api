import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CreateProductService } from '../../services/product/create-product-service'
import { pipeline } from 'node:stream'
import util from 'node:util'
import fs from 'node:fs'
import crypto from 'node:crypto'

const pump = util.promisify(pipeline)

const bodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1),
  categoryId: z.string().min(1),
  banner: z.string().min(1),
})

export class CreateProductController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const file = request.file()

    if (!file) {
      throw new Error('Banner is required')
    }
    const parts = request.parts()
    console.log(parts)

    let body = {}
    for await (const part of parts) {
      if (part.type === 'field') {
        body = {
          ...body,
          [part.fieldname]: part.value,
        }
      } else if (part.type === 'file') {
        const fileHash = crypto.randomBytes(16).toString('hex')
        // const nameFile = createSlug(part.filename)
        const fileName = `${fileHash}-${part.filename}`

        body = {
          ...body,
          banner: fileName,
        }

        await pump(part.file, fs.createWriteStream(`./tmp/${fileName}`))
      }
    }

    const { name, categoryId, description, price, banner } =
      bodySchema.parse(body)

    const createProductService = new CreateProductService()
    const product = await createProductService.execute({
      name,
      description,
      price,
      banner,
      categoryId,
    })

    return reply.send(product)
  }
}

import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CreateProductService } from '../../services/product/create-product-service'

import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'

const bodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1),
  categoryId: z.string().min(1),
  banner: z.object({
    name: z.string(),
    data: z.instanceof(Buffer),
    size: z.number(),
    encoding: z.string(),
    tempFilePath: z.string(),
    truncated: z.boolean(),
    mimetype: z.string(),
    md5: z.string(),
    mv: z.function(),
  }),
})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export class CreateProductControllerCloudinary {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    // console.log(request.body)
    const { categoryId, description, price, name, banner } = bodySchema.parse(
      request.body
    )

    if (!banner) {
      throw new Error('Banner is required')
    }

    const resultFile: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, (error, result) => {
            if (error) {
              reject(error)
              return
            }
            if (result) {
              // Check if result is not undefined
              resolve(result)
            } else {
              reject(new Error('Upload result is undefined')) // Reject with an error if result is undefined
            }
          })
          .end(banner.data)
      }
    )

    const createProductService = new CreateProductService()
    const product = await createProductService.execute({
      name,
      description,
      price,
      banner: resultFile.url,
      categoryId,
    })

    return reply.send(product)
  }
}

import { prisma } from '../../lib/prisma'

interface ProductRequest {
  name: string
  description: string
  price: string
  banner: string
  categoryId: string
}

export class CreateProductService {
  async execute({
    name,
    description,
    price,
    banner,
    categoryId,
  }: ProductRequest) {
    const product = await prisma.product.create({
      data: {
        banner,
        name,
        description,
        price: Number(price),
        categoryId,
      },
    })
  }
}

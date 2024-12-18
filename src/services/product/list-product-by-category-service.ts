import { prisma } from '../../lib/prisma'

interface ProductRequest {
  categoryId: string
}

export class ListProductByCategoryService {
  async execute({ categoryId }: ProductRequest) {
    const products = await prisma.product.findMany({
      where: {
        categoryId,
      },
    })

    return { products }
  }
}

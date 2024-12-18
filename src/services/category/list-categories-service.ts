import { prisma } from '../../lib/prisma'

export class ListCategoriesService {
  async execute() {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    })

    return { categories }
  }
}

import { prisma } from '../../lib/prisma'

export class ListOrdersService {
  async execute() {
    const orders = await prisma.order.findMany({
      where: {
        status: false,
        draft: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return { orders }
  }
}

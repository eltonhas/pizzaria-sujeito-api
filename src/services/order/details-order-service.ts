import { prisma } from '../../lib/prisma'

interface DetailsOrderRequest {
  orderId: string
}

export class DetailsOrderService {
  async execute({ orderId }: DetailsOrderRequest) {
    const items = await prisma.item.findMany({
      where: {
        orderId: orderId,
      },
      include: {
        product: true,
        order: true,
      },
    })

    return { items }
  }
}

import { prisma } from '../../lib/prisma'

interface OrderRequest {
  orderId: string
}

export class DeleteOrderService {
  async execute({ orderId }: OrderRequest) {
    const order = await prisma.order.delete({
      where: {
        id: orderId,
      },
    })

    return { order }
  }
}

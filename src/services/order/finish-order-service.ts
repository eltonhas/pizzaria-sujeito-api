import { prisma } from '../../lib/prisma'

interface FinishOrderRequest {
  orderId: string
}

export class FinishOrderService {
  async execute({ orderId }: FinishOrderRequest) {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: true,
      },
    })

    return { order }
  }
}

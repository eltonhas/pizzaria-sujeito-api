import { prisma } from '../../lib/prisma'

interface AddItemToOrderRequest {
  orderId: string
  productId: string
  amount: string
}

export class AddItemToOrderService {
  async execute({ orderId, productId, amount }: AddItemToOrderRequest) {
    const order = await prisma.item.create({
      data: {
        orderId,
        productId,
        amount: Number(amount),
      },
    })

    return { order }
  }
}

import { prisma } from '../../lib/prisma'

interface RemoveItemToOrderRequest {
  itemId: string
}

export class RemoveItemToOrderService {
  async execute({ itemId }: RemoveItemToOrderRequest) {
    const item = await prisma.item.delete({
      where: {
        id: itemId,
      },
    })

    return { item }
  }
}

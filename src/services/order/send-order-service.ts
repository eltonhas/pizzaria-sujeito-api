import { prisma } from '../../lib/prisma'

interface SendOrderServiceRequest {
  orderId: string
}
export class SendOrderService {
  async execute({ orderId }: SendOrderServiceRequest) {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        draft: false,
      },
    })

    return { order }
  }
}

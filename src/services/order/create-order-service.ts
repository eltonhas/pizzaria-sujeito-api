import { prisma } from '../../lib/prisma'

interface OrderRequest {
  table: string
  name: string | null | undefined
}

export class CreateOrderService {
  async execute({ table, name }: OrderRequest) {
    const order = await prisma.order.create({
      data: {
        table,
        name,
      },
    })

    return { order }
  }
}

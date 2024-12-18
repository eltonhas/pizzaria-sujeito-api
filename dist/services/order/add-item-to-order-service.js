"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddItemToOrderService = void 0;
const prisma_1 = require("../../lib/prisma");
class AddItemToOrderService {
    async execute({ orderId, productId, amount }) {
        const order = await prisma_1.prisma.item.create({
            data: {
                orderId,
                productId,
                amount: Number(amount),
            },
        });
        return { order };
    }
}
exports.AddItemToOrderService = AddItemToOrderService;

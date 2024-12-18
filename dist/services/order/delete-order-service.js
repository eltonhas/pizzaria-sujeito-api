"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOrderService = void 0;
const prisma_1 = require("../../lib/prisma");
class DeleteOrderService {
    async execute({ orderId }) {
        const order = await prisma_1.prisma.order.delete({
            where: {
                id: orderId,
            },
        });
        return { order };
    }
}
exports.DeleteOrderService = DeleteOrderService;

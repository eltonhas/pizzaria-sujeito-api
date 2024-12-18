"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishOrderService = void 0;
const prisma_1 = require("../../lib/prisma");
class FinishOrderService {
    async execute({ orderId }) {
        const order = await prisma_1.prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: true,
            },
        });
        return { order };
    }
}
exports.FinishOrderService = FinishOrderService;

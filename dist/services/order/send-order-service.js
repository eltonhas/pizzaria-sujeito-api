"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOrderService = void 0;
const prisma_1 = require("../../lib/prisma");
class SendOrderService {
    async execute({ orderId }) {
        const order = await prisma_1.prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                draft: false,
            },
        });
        return { order };
    }
}
exports.SendOrderService = SendOrderService;

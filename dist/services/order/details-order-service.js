"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailsOrderService = void 0;
const prisma_1 = require("../../lib/prisma");
class DetailsOrderService {
    async execute({ orderId }) {
        const items = await prisma_1.prisma.item.findMany({
            where: {
                orderId: orderId,
            },
            include: {
                product: true,
                order: true,
            },
        });
        return { items };
    }
}
exports.DetailsOrderService = DetailsOrderService;

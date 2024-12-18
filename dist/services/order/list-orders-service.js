"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOrdersService = void 0;
const prisma_1 = require("../../lib/prisma");
class ListOrdersService {
    async execute() {
        const orders = await prisma_1.prisma.order.findMany({
            where: {
                status: false,
                draft: false,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return { orders };
    }
}
exports.ListOrdersService = ListOrdersService;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderService = void 0;
const prisma_1 = require("../../lib/prisma");
class CreateOrderService {
    async execute({ table, name }) {
        const order = await prisma_1.prisma.order.create({
            data: {
                table,
                name,
            },
        });
        return { order };
    }
}
exports.CreateOrderService = CreateOrderService;

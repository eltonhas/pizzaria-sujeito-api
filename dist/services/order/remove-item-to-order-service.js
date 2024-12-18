"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveItemToOrderService = void 0;
const prisma_1 = require("../../lib/prisma");
class RemoveItemToOrderService {
    async execute({ itemId }) {
        const item = await prisma_1.prisma.item.delete({
            where: {
                id: itemId,
            },
        });
        return { item };
    }
}
exports.RemoveItemToOrderService = RemoveItemToOrderService;

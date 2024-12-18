"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProductByCategoryService = void 0;
const prisma_1 = require("../../lib/prisma");
class ListProductByCategoryService {
    async execute({ categoryId }) {
        const products = await prisma_1.prisma.product.findMany({
            where: {
                categoryId,
            },
        });
        return { products };
    }
}
exports.ListProductByCategoryService = ListProductByCategoryService;

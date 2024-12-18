"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductService = void 0;
const prisma_1 = require("../../lib/prisma");
class CreateProductService {
    async execute({ name, description, price, banner, categoryId, }) {
        const product = await prisma_1.prisma.product.create({
            data: {
                banner,
                name,
                description,
                price: Number(price),
                categoryId,
            },
        });
    }
}
exports.CreateProductService = CreateProductService;

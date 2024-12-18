"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryService = void 0;
const prisma_1 = require("../../lib/prisma");
class CreateCategoryService {
    async execute({ name }) {
        if (!name) {
            throw new Error('Name is required.');
        }
        const category = await prisma_1.prisma.category.create({
            data: {
                name,
            },
            select: {
                id: true,
                name: true,
            },
        });
        return { category };
    }
}
exports.CreateCategoryService = CreateCategoryService;

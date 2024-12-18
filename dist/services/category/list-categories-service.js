"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoriesService = void 0;
const prisma_1 = require("../../lib/prisma");
class ListCategoriesService {
    async execute() {
        const categories = await prisma_1.prisma.category.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        return { categories };
    }
}
exports.ListCategoriesService = ListCategoriesService;

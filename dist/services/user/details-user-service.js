"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailsUserService = void 0;
const prisma_1 = require("../../lib/prisma");
class DetailsUserService {
    async execute({ userId }) {
        const user = await prisma_1.prisma.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        return { user };
    }
}
exports.DetailsUserService = DetailsUserService;

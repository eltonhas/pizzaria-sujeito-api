"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../../lib/prisma");
class AuthUserService {
    async execute({ email, password }) {
        const user = await prisma_1.prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (!user) {
            throw new Error('User/password incorrect.');
        }
        const passwordMatch = await (0, bcryptjs_1.compare)(password, user.password);
        if (!passwordMatch) {
            throw new Error('User/password incorrect.');
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
}
exports.AuthUserService = AuthUserService;

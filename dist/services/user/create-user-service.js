"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../../lib/prisma");
class CreateUserService {
    async execute({ email, name, password }) {
        if (!email) {
            throw new Error('Email, is required.');
        }
        const userAlredyexists = await prisma_1.prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (userAlredyexists) {
            throw new Error('User alredy exists.');
        }
        const passwordHash = await (0, bcryptjs_1.hash)(password, 8);
        const user = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash,
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
exports.CreateUserService = CreateUserService;

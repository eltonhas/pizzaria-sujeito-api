"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const zod_1 = require("zod");
const auth_user_service_1 = require("../../services/user/auth-user-service");
const bodySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
class AuthUserController {
    async handle(request, reply) {
        const { email, password } = bodySchema.parse(request.body);
        const authUserService = new auth_user_service_1.AuthUserService();
        const auth = await authUserService.execute({ email, password });
        const token = await reply.jwtSign({ name: auth.name, email: auth.email }, {
            sign: {
                sub: auth.id,
            },
        });
        return reply.send({ ...auth, token });
    }
}
exports.AuthUserController = AuthUserController;

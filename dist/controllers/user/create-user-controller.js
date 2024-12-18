"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const create_user_service_1 = require("../../services/user/create-user-service");
const zod_1 = require("zod");
const bodySchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
class CreateUserController {
    async handle(request, reply) {
        const { name, email, password } = bodySchema.parse(request.body);
        const createUserService = new create_user_service_1.CreateUserService();
        const user = await createUserService.execute({ email, name, password });
        return reply.send(user);
    }
}
exports.CreateUserController = CreateUserController;

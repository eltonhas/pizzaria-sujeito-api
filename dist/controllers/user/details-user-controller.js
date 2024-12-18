"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailsUserController = void 0;
const zod_1 = require("zod");
const details_user_service_1 = require("../../services/user/details-user-service");
const bodySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
class DetailsUserController {
    async handle(request, reply) {
        const userId = request.user.sub;
        const detailsUserService = new details_user_service_1.DetailsUserService();
        const user = await detailsUserService.execute({ userId });
        return reply.send(user);
    }
}
exports.DetailsUserController = DetailsUserController;

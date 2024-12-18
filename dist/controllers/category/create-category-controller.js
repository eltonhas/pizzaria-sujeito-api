"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryController = void 0;
const create_category_service_1 = require("../../services/category/create-category-service");
const zod_1 = require("zod");
const bodySchema = zod_1.z.object({ name: zod_1.z.string().min(1) });
class CreateCategoryController {
    async handle(request, reply) {
        const { name } = bodySchema.parse(request.body);
        const createCategoryService = new create_category_service_1.CreateCategoryService();
        const category = await createCategoryService.execute({ name });
        return reply.send(category);
    }
}
exports.CreateCategoryController = CreateCategoryController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProductByCategoryController = void 0;
const list_product_by_category_service_1 = require("../../services/product/list-product-by-category-service");
const zod_1 = require("zod");
const queryParamsSchema = zod_1.z.object({
    categoryId: zod_1.z.string(),
});
class ListProductByCategoryController {
    async handle(request, reply) {
        const { categoryId } = queryParamsSchema.parse(request.query);
        const listProductByCategoryService = new list_product_by_category_service_1.ListProductByCategoryService();
        const products = await listProductByCategoryService.execute({
            categoryId: categoryId,
        });
        return reply.send(products);
    }
}
exports.ListProductByCategoryController = ListProductByCategoryController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoriesController = void 0;
const list_categories_service_1 = require("../../services/category/list-categories-service");
class ListCategoriesController {
    async handle(request, reply) {
        const listCategoriesService = new list_categories_service_1.ListCategoriesService();
        const categories = await listCategoriesService.execute();
        return reply.send(categories);
    }
}
exports.ListCategoriesController = ListCategoriesController;

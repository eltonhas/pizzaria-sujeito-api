"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOrdersController = void 0;
const list_orders_service_1 = require("../../services/order/list-orders-service");
class ListOrdersController {
    async handle(request, reply) {
        const listOrdersService = new list_orders_service_1.ListOrdersService();
        const orders = await listOrdersService.execute();
        return reply.send(orders);
    }
}
exports.ListOrdersController = ListOrdersController;

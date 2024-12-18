"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOrderController = void 0;
const delete_order_service_1 = require("../../services/order/delete-order-service");
const zod_1 = require("zod");
const queryParamsSchema = zod_1.z.object({ orderId: zod_1.z.string() });
class DeleteOrderController {
    async handle(request, reply) {
        const { orderId } = queryParamsSchema.parse(request.query);
        const deleteOrderService = new delete_order_service_1.DeleteOrderService();
        const order = await deleteOrderService.execute({ orderId: orderId });
        return reply.send(order);
    }
}
exports.DeleteOrderController = DeleteOrderController;

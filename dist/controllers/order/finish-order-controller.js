"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishOrderController = void 0;
const finish_order_service_1 = require("../../services/order/finish-order-service");
const zod_1 = require("zod");
const bodySchema = zod_1.z.object({
    orderId: zod_1.z.string(),
});
class FinishOrderController {
    async handle(request, reply) {
        const { orderId } = bodySchema.parse(request.body);
        const finishOrderService = new finish_order_service_1.FinishOrderService();
        const order = await finishOrderService.execute({ orderId });
        return reply.send(order);
    }
}
exports.FinishOrderController = FinishOrderController;

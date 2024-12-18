"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOrderController = void 0;
const zod_1 = require("zod");
const send_order_service_1 = require("../../services/order/send-order-service");
const bodySchema = zod_1.z.object({
    orderId: zod_1.z.string(),
});
class SendOrderController {
    async handle(request, reply) {
        const { orderId } = bodySchema.parse(request.body);
        const sendOrderService = new send_order_service_1.SendOrderService();
        const order = await sendOrderService.execute({ orderId });
        return reply.send(order);
    }
}
exports.SendOrderController = SendOrderController;

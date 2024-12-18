"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddItemToOrderController = void 0;
const zod_1 = require("zod");
const add_item_to_order_service_1 = require("../../services/order/add-item-to-order-service");
const bodySchema = zod_1.z.object({
    orderId: zod_1.z.string(),
    productId: zod_1.z.string(),
    amount: zod_1.z.string(),
});
class AddItemToOrderController {
    async handle(request, reply) {
        const { orderId, productId, amount } = bodySchema.parse(request.body);
        const addItemToOrderService = new add_item_to_order_service_1.AddItemToOrderService();
        const order = await addItemToOrderService.execute({
            orderId,
            productId,
            amount,
        });
        return reply.send(order);
    }
}
exports.AddItemToOrderController = AddItemToOrderController;

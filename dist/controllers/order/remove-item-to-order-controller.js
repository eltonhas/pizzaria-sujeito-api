"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveItemToOrderController = void 0;
const remove_item_to_order_service_1 = require("../../services/order/remove-item-to-order-service");
const zod_1 = require("zod");
const queryParamsSchema = zod_1.z.object({ itemId: zod_1.z.string() });
class RemoveItemToOrderController {
    async handle(request, reply) {
        const { itemId } = queryParamsSchema.parse(request.query);
        const removeItemToOrderService = new remove_item_to_order_service_1.RemoveItemToOrderService();
        const item = await removeItemToOrderService.execute({ itemId });
        return reply.send(item);
    }
}
exports.RemoveItemToOrderController = RemoveItemToOrderController;

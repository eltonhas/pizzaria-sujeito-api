"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailsOrderController = void 0;
const zod_1 = require("zod");
const details_order_service_1 = require("../../services/order/details-order-service");
const queryParamsSchema = zod_1.z.object({ orderId: zod_1.z.string() });
class DetailsOrderController {
    async handle(request, reply) {
        const { orderId } = queryParamsSchema.parse(request.query);
        const detailsOrderService = new details_order_service_1.DetailsOrderService();
        const orders = await detailsOrderService.execute({ orderId });
        return reply.send(orders);
    }
}
exports.DetailsOrderController = DetailsOrderController;

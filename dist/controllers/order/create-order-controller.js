"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderController = void 0;
const create_order_service_1 = require("../../services/order/create-order-service");
const zod_1 = require("zod");
const bodySchema = zod_1.z.object({
    table: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1).nullish(),
});
class CreateOrderController {
    async handle(request, reply) {
        const { table, name } = bodySchema.parse(request.body);
        const createOrderService = new create_order_service_1.CreateOrderService();
        const order = await createOrderService.execute({ table, name });
        return reply.send(order);
    }
}
exports.CreateOrderController = CreateOrderController;

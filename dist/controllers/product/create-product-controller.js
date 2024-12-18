"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductController = void 0;
const zod_1 = require("zod");
const create_product_service_1 = require("../../services/product/create-product-service");
const node_stream_1 = require("node:stream");
const node_util_1 = __importDefault(require("node:util"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_crypto_1 = __importDefault(require("node:crypto"));
const pump = node_util_1.default.promisify(node_stream_1.pipeline);
const bodySchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    price: zod_1.z.string().min(1),
    categoryId: zod_1.z.string().min(1),
    banner: zod_1.z.string().min(1),
});
class CreateProductController {
    async handle(request, reply) {
        const file = request.file();
        if (!file) {
            throw new Error('Banner is required');
        }
        const parts = request.parts();
        console.log(parts);
        let body = {};
        for await (const part of parts) {
            if (part.type === 'field') {
                body = {
                    ...body,
                    [part.fieldname]: part.value,
                };
            }
            else if (part.type === 'file') {
                const fileHash = node_crypto_1.default.randomBytes(16).toString('hex');
                // const nameFile = createSlug(part.filename)
                const fileName = `${fileHash}-${part.filename}`;
                body = {
                    ...body,
                    banner: fileName,
                };
                await pump(part.file, node_fs_1.default.createWriteStream(`./tmp/${fileName}`));
            }
        }
        const { name, categoryId, description, price, banner } = bodySchema.parse(body);
        const createProductService = new create_product_service_1.CreateProductService();
        const product = await createProductService.execute({
            name,
            description,
            price,
            banner,
            categoryId,
        });
        return reply.send(product);
    }
}
exports.CreateProductController = CreateProductController;

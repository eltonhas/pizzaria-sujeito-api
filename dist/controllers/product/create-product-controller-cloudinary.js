"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductControllerCloudinary = void 0;
const zod_1 = require("zod");
const create_product_service_1 = require("../../services/product/create-product-service");
const cloudinary_1 = require("cloudinary");
const bodySchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    price: zod_1.z.string().min(1),
    categoryId: zod_1.z.string().min(1),
    banner: zod_1.z.object({
        name: zod_1.z.string(),
        data: zod_1.z.instanceof(Buffer),
        size: zod_1.z.number(),
        encoding: zod_1.z.string(),
        tempFilePath: zod_1.z.string(),
        truncated: zod_1.z.boolean(),
        mimetype: zod_1.z.string(),
        md5: zod_1.z.string(),
        mv: zod_1.z.function(),
    }),
});
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
class CreateProductControllerCloudinary {
    async handle(request, reply) {
        // console.log(request.body)
        const { categoryId, description, price, name, banner } = bodySchema.parse(request.body);
        if (!banner) {
            throw new Error('Banner is required');
        }
        const resultFile = await new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader
                .upload_stream({}, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (result) {
                    // Check if result is not undefined
                    resolve(result);
                }
                else {
                    reject(new Error('Upload result is undefined')); // Reject with an error if result is undefined
                }
            })
                .end(banner.data);
        });
        const createProductService = new create_product_service_1.CreateProductService();
        const product = await createProductService.execute({
            name,
            description,
            price,
            banner: resultFile.url,
            categoryId,
        });
        return reply.send(product);
    }
}
exports.CreateProductControllerCloudinary = CreateProductControllerCloudinary;

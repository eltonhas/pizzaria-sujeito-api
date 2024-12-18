"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const fastify_multer_1 = __importDefault(require("fastify-multer"));
const node_path_1 = require("node:path");
exports.storage = fastify_multer_1.default.diskStorage({
    destination: (0, node_path_1.resolve)(__dirname, '..', '..', 'tmp'),
    filename: (request, file, callback) => {
        const fileHash = node_crypto_1.default.randomBytes(16).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
    },
});

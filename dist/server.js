"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const static_1 = __importDefault(require("@fastify/static"));
const fastify_file_upload_1 = __importDefault(require("fastify-file-upload"));
const node_path_1 = __importDefault(require("node:path"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const zod_1 = require("zod");
const routes_1 = require("./routes");
const app = (0, fastify_1.default)({ logger: true });
app.register(jwt_1.default, {
    secret: process.env.JWT_SECRET || '',
    sign: { expiresIn: '30d' },
});
app.register(cors_1.default, {
    origin: '*',
});
app.register(multipart_1.default, {
    limits: {
        fieldNameSize: 100, // Max field name size in bytes
        fieldSize: 100, // Max field value size in bytes
        fields: 10, // Max number of non-file fields
        fileSize: 1000000 * 5, // For multipart forms, the max file size in bytes
        files: 1, // Max number of file fields
        headerPairs: 2000, // Max number of header key=>value pairs
        parts: 1000, // For multipart forms, the max number of parts (fields + files)
    },
});
app.register(fastify_file_upload_1.default, {
    limits: { fileSize: 50 * 1024 * 1024 },
});
app.register(static_1.default, {
    root: node_path_1.default.resolve(__dirname, '..', 'tmp'),
    prefix: '/files',
});
app.register(routes_1.routes);
app.setErrorHandler((error, _, reply) => {
    if (error instanceof zod_1.ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error', issues: error.format() });
    }
    if (error instanceof Error) {
        return reply.status(400).send({ error: error.message });
    }
    return reply
        .status(500)
        .send({ status: 'error', error: 'Internal server error' });
});
app
    .listen({
    port: Number.parseInt(process.env.PORT),
})
    .then(() => {
    console.log('Server runnig!');
});

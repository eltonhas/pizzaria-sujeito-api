"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
async function isAuthenticated(request, reply) {
    try {
        await request.jwtVerify();
    }
    catch (err) {
        return reply.status(401).send({ error: 'Unauthorized' });
    }
}

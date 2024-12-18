import type { FastifyRequest, FastifyReply } from 'fastify'

export async function isAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send({ error: 'Unauthorized' })
  }
}

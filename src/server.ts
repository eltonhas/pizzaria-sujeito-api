import fastify, { type FastifyReply } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyStatic from '@fastify/static'
import fileUpload from 'fastify-file-upload'

import path, { parse } from 'node:path'

import multipart from '@fastify/multipart'

import { ZodError } from 'zod'

import { routes } from './routes'

const app = fastify({ logger: true })

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || '',
  sign: { expiresIn: '30d' },
})

app.register(fastifyCors, {
  origin: '*',
})

app.register(multipart, {
  limits: {
    fieldNameSize: 100, // Max field name size in bytes
    fieldSize: 100, // Max field value size in bytes
    fields: 10, // Max number of non-file fields
    fileSize: 1000000 * 5, // For multipart forms, the max file size in bytes
    files: 1, // Max number of file fields
    headerPairs: 2000, // Max number of header key=>value pairs
    parts: 1000, // For multipart forms, the max number of parts (fields + files)
  },
})

app.register(fileUpload, {
  limits: { fileSize: 50 * 1024 * 1024 },
})

app.register(fastifyStatic, {
  root: path.resolve(__dirname, '..', 'tmp'),
  prefix: '/files',
})

app.register(routes)

app.setErrorHandler((error, _, reply: FastifyReply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (error instanceof Error) {
    return reply.status(400).send({ error: error.message })
  }

  return reply
    .status(500)
    .send({ status: 'error', error: 'Internal server error' })
})

app
  .listen({
    port: Number.parseInt(process.env.PORT as string),
  })
  .then(() => {
    console.log('Server runnig!')
  })

import crypto from 'node:crypto'
import multer from 'fastify-multer'

import { extname, resolve } from 'node:path'

export const storage = multer.diskStorage({
  destination: resolve(__dirname, '..', '..', 'tmp'),
  filename: (request, file, callback) => {
    const fileHash = crypto.randomBytes(16).toString('hex')
    const fileName = `${fileHash}-${file.originalname}`

    return callback(null, fileName)
  },
})

import type { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import { CreateUserController } from './controllers/user/create-user-controller'
import { AuthUserController } from './controllers/user/auth-user-controller'
import { DetailsUserController } from './controllers/user/details-user-controller'
import { isAuthenticated } from './middlewares/is-authenticated'
import { CreateCategoryController } from './controllers/category/create-category-controller'
import { ListCategoriesController } from './controllers/category/list-categories-controller'
// import { CreateProductController } from './controllers/product/create-product-controller'

import { ListProductByCategoryController } from './controllers/product/list-product-by-category-controller'
import { CreateOrderController } from './controllers/order/create-order-controller'
import { DeleteOrderController } from './controllers/order/delete-order-controller'
import { AddItemToOrderController } from './controllers/order/add-item-to-order-controller'
import { RemoveItemToOrderController } from './controllers/order/remove-item-to-order-controller'
import { SendOrderController } from './controllers/order/send-order-controller'
import { ListOrdersController } from './controllers/order/list-orders-controller'
import { DetailsOrderController } from './controllers/order/details-order-controller'
import { FinishOrderController } from './controllers/order/finish-order-controller'
import { CreateProductControllerCloudinary } from './controllers/product/create-product-controller-cloudinary'

async function routes(app: FastifyInstance) {
  // ---- USER ROUTES ----
  app.post('/users', new CreateUserController().handle)
  app.post('/session', new AuthUserController().handle)

  app.get(
    '/me',
    { onRequest: [isAuthenticated] },
    new DetailsUserController().handle
  )

  // ---- CATEGORIES ROUTES ----
  app.post(
    '/category',
    { onRequest: [isAuthenticated] },
    new CreateCategoryController().handle
  )
  app.get(
    '/categories',
    { onRequest: [isAuthenticated] },
    new ListCategoriesController().handle
  )

  // ---- PRODUCTS ROUTES ----
  app.post(
    '/product',
    { onRequest: [isAuthenticated] },
    new CreateProductControllerCloudinary().handle
  )

  app.get(
    '/category/product',
    { onRequest: [isAuthenticated] },
    new ListProductByCategoryController().handle
  )

  // ---- ORDERS ROUTES ----
  app.post(
    '/order',
    { onRequest: [isAuthenticated] },
    new CreateOrderController().handle
  )

  app.delete(
    '/order',
    { onRequest: [isAuthenticated] },
    new DeleteOrderController().handle
  )

  app.post(
    '/order/add',
    { onRequest: [isAuthenticated] },
    new AddItemToOrderController().handle
  )

  app.delete(
    '/order/remove',
    { onRequest: [isAuthenticated] },
    new RemoveItemToOrderController().handle
  )

  app.put(
    '/order/send',
    { onRequest: [isAuthenticated] },
    new SendOrderController().handle
  )

  app.get(
    '/orders',
    { onRequest: [isAuthenticated] },
    new ListOrdersController().handle
  )

  app.get(
    '/order/details',
    { onRequest: [isAuthenticated] },
    new DetailsOrderController().handle
  )

  app.put(
    '/order/finish',
    { onRequest: [isAuthenticated] },
    new FinishOrderController().handle
  )
}

export { routes }

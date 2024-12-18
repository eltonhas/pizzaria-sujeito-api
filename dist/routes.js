"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = routes;
const create_user_controller_1 = require("./controllers/user/create-user-controller");
const auth_user_controller_1 = require("./controllers/user/auth-user-controller");
const details_user_controller_1 = require("./controllers/user/details-user-controller");
const is_authenticated_1 = require("./middlewares/is-authenticated");
const create_category_controller_1 = require("./controllers/category/create-category-controller");
const list_categories_controller_1 = require("./controllers/category/list-categories-controller");
// import { CreateProductController } from './controllers/product/create-product-controller'
const list_product_by_category_controller_1 = require("./controllers/product/list-product-by-category-controller");
const create_order_controller_1 = require("./controllers/order/create-order-controller");
const delete_order_controller_1 = require("./controllers/order/delete-order-controller");
const add_item_to_order_controller_1 = require("./controllers/order/add-item-to-order-controller");
const remove_item_to_order_controller_1 = require("./controllers/order/remove-item-to-order-controller");
const send_order_controller_1 = require("./controllers/order/send-order-controller");
const list_orders_controller_1 = require("./controllers/order/list-orders-controller");
const details_order_controller_1 = require("./controllers/order/details-order-controller");
const finish_order_controller_1 = require("./controllers/order/finish-order-controller");
const create_product_controller_cloudinary_1 = require("./controllers/product/create-product-controller-cloudinary");
async function routes(app) {
    // ---- USER ROUTES ----
    app.post('/users', new create_user_controller_1.CreateUserController().handle);
    app.post('/session', new auth_user_controller_1.AuthUserController().handle);
    app.get('/me', { onRequest: [is_authenticated_1.isAuthenticated] }, new details_user_controller_1.DetailsUserController().handle);
    // ---- CATEGORIES ROUTES ----
    app.post('/category', { onRequest: [is_authenticated_1.isAuthenticated] }, new create_category_controller_1.CreateCategoryController().handle);
    app.get('/categories', { onRequest: [is_authenticated_1.isAuthenticated] }, new list_categories_controller_1.ListCategoriesController().handle);
    // ---- PRODUCTS ROUTES ----
    app.post('/product', { onRequest: [is_authenticated_1.isAuthenticated] }, new create_product_controller_cloudinary_1.CreateProductControllerCloudinary().handle);
    app.get('/category/product', { onRequest: [is_authenticated_1.isAuthenticated] }, new list_product_by_category_controller_1.ListProductByCategoryController().handle);
    // ---- ORDERS ROUTES ----
    app.post('/order', { onRequest: [is_authenticated_1.isAuthenticated] }, new create_order_controller_1.CreateOrderController().handle);
    app.delete('/order', { onRequest: [is_authenticated_1.isAuthenticated] }, new delete_order_controller_1.DeleteOrderController().handle);
    app.post('/order/add', { onRequest: [is_authenticated_1.isAuthenticated] }, new add_item_to_order_controller_1.AddItemToOrderController().handle);
    app.delete('/order/remove', { onRequest: [is_authenticated_1.isAuthenticated] }, new remove_item_to_order_controller_1.RemoveItemToOrderController().handle);
    app.put('/order/send', { onRequest: [is_authenticated_1.isAuthenticated] }, new send_order_controller_1.SendOrderController().handle);
    app.get('/orders', { onRequest: [is_authenticated_1.isAuthenticated] }, new list_orders_controller_1.ListOrdersController().handle);
    app.get('/order/details', { onRequest: [is_authenticated_1.isAuthenticated] }, new details_order_controller_1.DetailsOrderController().handle);
    app.put('/order/finish', { onRequest: [is_authenticated_1.isAuthenticated] }, new finish_order_controller_1.FinishOrderController().handle);
}

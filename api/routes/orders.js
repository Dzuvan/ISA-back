const express = require('express');
const router = express.Router();
const checkAuth = require('../middlware/check-auth');

const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', checkAuth, OrdersController.orders_add_new);

router.get('/:orderId', checkAuth, OrdersController.orders_get_one);

router.delete('/:orderId', checkAuth, OrdersController.orders_delete_one);

module.exports = router;

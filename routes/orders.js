const router = require('express').Router();

const ordersController = require('../controllers/orders.js');

router.get('/', ordersController.getOrders);

router.get('/:id', ordersController.findOrder);

router.post('/', ordersController.createOrder);

router.put('/:id', ordersController.updateOrder);

router.delete('/:id', ordersController.deleteOrder);

module.exports = router;

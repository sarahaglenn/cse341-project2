const router = require('express').Router();

const ordersController = require('../controllers/orders.js');
const validation = require('../middleware/validate.js');

router.get('/', ordersController.getOrders);

router.get('/:id', ordersController.findOrder);

router.post('/', validation.saveOrder, ordersController.createOrder);

router.put('/:id', validation.updateOrder, ordersController.updateOrder);

router.delete('/:id', ordersController.deleteOrder);

module.exports = router;

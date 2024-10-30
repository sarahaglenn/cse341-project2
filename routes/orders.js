const router = require('express').Router();

const ordersController = require('../controllers/orders.js');
const validation = require('../middleware/validate.js');
const auth = require('../controllers/auth.js');

router.get('/', auth.authCheck, ordersController.getOrders);

router.get('/:id', auth.authCheck, ordersController.findOrder);

router.post('/', auth.authCheck, validation.saveOrder, ordersController.createOrder);

router.put('/:id', auth.authCheck, validation.updateOrder, ordersController.updateOrder);

router.delete('/:id', auth.authCheck, ordersController.deleteOrder);

module.exports = router;

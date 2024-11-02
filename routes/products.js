const router = require('express').Router();

const productsController = require('../controllers/products');
const validation = require('../middleware/validate.js');
const auth = require('../controllers/auth.js');

router.get('/', productsController.getProducts);

router.get('/:id', productsController.findProduct);

router.post('/', auth.authCheck, validation.saveProduct, productsController.createProduct);

router.put('/:id', auth.authCheck, validation.updateProduct, productsController.updateProduct);

router.delete('/:id', auth.authCheck, productsController.deleteProduct);

module.exports = router;

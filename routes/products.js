const router = require('express').Router();

const productsController = require('../controllers/products');
const validation = require('../middleware/validate.js');

router.get('/', productsController.getProducts);

router.get('/:id', productsController.findProduct);

router.post('/', validation.saveProduct, productsController.createProduct);

router.put('/:id', validation.updateProduct, productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;

const router = require('express').Router();

const productsController = require('../controllers/products');

router.get('/', productsController.getProducts);

router.get('/:id', productsController.findProduct);

router.post('/', productsController.createProduct);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('All Things Running Store API');
});

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/api-docs', require('./swagger'));

module.exports = router;

const router = require('express').Router();

const usersController = require('../controllers/users.js');
const validation = require('../middleware/validate.js');
const auth = require('../controllers/auth.js');

router.get('/', usersController.getUsers);

router.get('/:id', usersController.findUser);

router.post('/', auth.authCheck, validation.saveUser, usersController.createUser);

router.put('/:id', auth.authCheck, validation.updateUser, usersController.updateUser);

router.delete('/:id', auth.authCheck, usersController.deleteUser);

module.exports = router;

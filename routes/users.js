const router = require('express').Router();

const usersController = require('../controllers/users.js');
const validation = require('../middleware/validate.js');

router.get('/', usersController.getUsers);

router.get('/:id', usersController.findUser);

router.post('/', validation.saveUser, usersController.createUser);

router.put('/:id', validation.updateUser, usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;

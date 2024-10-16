const router = require('express').Router();

const usersController = require('../controllers/users.js');

router.get('/', usersController.getUsers);

router.get('/:id', usersController.findUser);

router.post('/', usersController.createUser);

router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;

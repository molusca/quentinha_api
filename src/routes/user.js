var express = require('express');
var router = express.Router();
var user = require('../controllers/user');


router.get('/', user.getUsers);
router.post('/', user.createUser);
router.put('/:id', user.updateUser);
router.get('/:id', user.getUserById);
router.delete('/:id', user.deleteUser);

module.exports = router;
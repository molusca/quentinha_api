var express = require('express');
var router = express.Router();
var menuItem = require('../controllers/menuItem');


router.get('/restaurant/:id', menuItem.getRestaurantMenuItems);
router.post('/', menuItem.createMenuItem);
router.put('/:id', menuItem.updateMenuItem);
router.get('/:id', menuItem.getMenuItemById);
router.delete('/:id', menuItem.deleteMenuItem);

module.exports = router;
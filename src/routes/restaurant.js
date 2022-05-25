var express = require('express');
var router = express.Router();
var restaurant = require('../controllers/restaurant');


router.get('/', restaurant.getRestaurants);
router.post('/', restaurant.createRestaurant);
router.put('/:id', restaurant.updateRestaurant);
router.get('/:id', restaurant.getRestaurantById);
router.delete('/:id', restaurant.deleteRestaurant);

module.exports = router;
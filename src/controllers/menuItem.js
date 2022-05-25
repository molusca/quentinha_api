const helpers = require('../helpers/functions');
const Models = require('../models/index');

async function getRestaurantMenuItems(req, res) {
  const restaurantId = req.params.id;

  try {
    let menuItems = await Models.MenuItem.findAll({
      where: {
        restaurantId: restaurantId
      }
    });

    if (!menuItems) {
      return res.status(404).json({
        success: false,
        message: 'No menu items found',
        payload: []
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Menu items found',
      payload: menuItems
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'error on api',
      payload: []
    });
  }
};

async function getMenuItemById(req, res) {
  const menuItemId = req.params.id;

  try {
    let menuItem = await Models.MenuItem.findOne({
      where: {
        id: menuItemId
      }
    });

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
        payload: []
      });
    }

    menuItem = menuItem.toJSON();

    return res.status(200).json({
      success: true,
      message: 'Menu item found',
      payload: menuItem
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'error on api',
      payload: []
    });
  }
};

async function createMenuItem(req, res) { 
  const body = req.body;

  const requiredItems = [
    'description',
    'name',
    'restaurantId',
  ];

  for (let item of requiredItems) {
    if(!helpers.existsAndHasValue(item, body)) {
      return res.status(422).json({
        success: false,
        message: `${item} field is required`
      });
    };
  };

  try {
    let menuItem = await Models.MenuItem.create({
      description: body.description,
      name: body.name,
      restaurantId: body.restaurantId
    });

    menuItem = menuItem.toJSON();

    return res.status(200).json({
      success: true,
      message: 'Menu item created successfully',
      payload: menuItem
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'error on api',
      payload: []
    });
  }
};

async function updateMenuItem(req, res) {
  const menuItemId = req.params.id;
  const body = req.body;
  try {
    let menuItem = await Models.MenuItem.findOne({
      where: {
        id: menuItemId,
      }
    });

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
        payload: []
      });
    }

    const updateItems = [
      'description',
      'name',
    ];

    for (let item of updateItems) {
      if (helpers.existsAndHasValue(item, body)) {
        menuItem[item] = body[item];
      }
    }

    await menuItem.save();
    menuItem = menuItem.toJSON();

    return res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      payload: menuItem
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'error on api',
      payload: []
    });
  }
};

async function deleteMenuItem(req, res) {
  const menuItemId = req.params.id;

  try {
    let menuItem = await Models.MenuItem.findOne({
      where: {
        id: menuItemId
      }
    });

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
        payload: []
      });
    }

    await menuItem.destroy();

    return res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully',
      payload: []
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'error on api',
      payload: []
    });
  }
};

module.exports = {
  getRestaurantMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
}
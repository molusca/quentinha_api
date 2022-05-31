const bcrypt = require('bcrypt');
const helpers = require('../helpers/functions');
const Models = require('../models/index');

async function generateNewPassword(req, res, next) {
  const body = req.body;

  if(!helpers.existsAndHasValue('email', body)) {
    return res.status(422).json({
      success: false,
      message: `${item} field is required`
    });
  };

  const email = body.email;

  try {
    const user = await Models.User.findOne({
      where: {
        email: email.toLowerCase(),
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        payload: []
      });
    }

    const newPassword = await helpers.randomString(10);
    user['password'] = bcrypt.hashSync(newPassword, 10);
    user.save();
    user = user.toJSON();

    // INTEGRATE SEND EMAIL

    return res.status(200).json({
      success: true,
      message: 'New password generated successfully',
      payload: user
    });
    
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  generateNewPassword
}
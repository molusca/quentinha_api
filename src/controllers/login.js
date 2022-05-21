const jwt = require('jsonwebtoken');
const Models = require('../models/index');
const bcrypt = require('bcrypt');
const jwtConfig = require('../config/jwt')
const helpers = require('../helpers/functions');

async function loginController(req, res) {
  const body = req.body;
  const requiredItems = ['email', 'password'];
  console.log(body);

  for (let item of requiredItems) {
    if(!helpers.existsAndHasValue(item, body)) {
      return res.status(422).json({
        success: false,
        message: `${item} field is required`
      });
    }
  }

  let user = await Models.User.findOne({
    where: {
      email: body.email
    }
  });

  if (user == null) {
    res.status(403).json({
      'success': false,
      'message': 'Incorret email or password'
    });
    return;
  }

  const comparePassword = bcrypt.compareSync(body.password, user.password);

  if (!comparePassword) {
    res.status(403).json({
      success: false,
      message: 'Incorrect email or password',
      payload: []
    });
    return;
  }

  let token = jwt.sign({userId: user.id}, jwtConfig.SECRET);
  user.token = token;
  await user.save();
  user = user.toJSON();
  delete user.password;

  res.json({
    success: true,
    message: 'Logged in successfully',
    payload: user
  });
};

module.exports = {
  loginController
}
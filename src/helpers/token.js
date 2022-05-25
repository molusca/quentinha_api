const JsonWebToken = require('jsonwebtoken');
const JwtConfig = require('../config/jwt');


module.exports = {
  create : async (data) => {
    return JsonWebToken.sign(data, JwtConfig.SECRET);
  },

  verify : async (req, res) => {
    const token = req.headers['x-access-token'];

    return JsonWebToken.verify(token, JwtConfig.SECRET, (err, decoded) => {
      if(err)  return res.status(401).json({
        success: false,
        message: 'Not Auth',
      }).end();

      req.userId = decoded.userId;
    });
  },
}
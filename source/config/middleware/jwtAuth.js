const { pareJwtToken, jwtToken } = require("../../app/utils/func")
const { entertainersService, customersService } = require('../../app/services')

const getUserToken = (data) => {
  return jwtToken({ _id: data._id, user_id: { role: data.user_id.role, _id: data.user_id._id } });
}

module.exports = (req, res, next) => {
  if (req.headers &&
    req.headers.authorization &&
    (req.headers.authorization.split(' ')[0] === 'Token' || req.headers.authorization.split(' ')[0] === 'Bearer')) {

    let jwtToken = req.headers.authorization.split(' ')[1];
    try {
      let payload = pareJwtToken(jwtToken);
      if (payload) {
        req.user = payload;
        return next()
      } else {
        res.sendError('Unauthorized user!', '401');
      }
    } catch (er) {
      res.sendError(er.message, '401');
    }
  } else {
    res.sendError('Login required !', 401);
  }
};

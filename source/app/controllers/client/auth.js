const login = (req, res) => {
  error = req.query.error?true:false
  res.render("client/auth/login",{error});
};

const register = (req, res) => {
  res.render("client/auth/register");
};

module.exports = {
  login,
  register
};

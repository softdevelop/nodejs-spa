const login = (req, res) => {
  res.render("client/auth/login");
};

const register = (req, res) => {
  res.render("client/auth/register");
};

module.exports = {
  login,
  register
};


const userCtrl = require("./users.controller");
const authCtrl = require("./auth.controller");
const projectCtrl = require("./projects.controller")
const requestCtrl = require("./requests.controller")
const utils = require("./utils");

module.exports = {
  authCtrl,
  userCtrl,
  projectCtrl,
  requestCtrl,
  utils
};

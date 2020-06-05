const mongoose = require("mongoose");
const User = mongoose.model("User");
const { ROLES } = require("../../models/users")
const moment = require("moment");
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

// utils 
const { jwtToken } = require("../../utils/func");

const getNodeLocalstorage = (key) => {
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  return localStorage.getItem(key);
}

const removeNodeLocalstorage = (key) => {
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  return localStorage.removeItem(key);
}

viewLoginPage = (req, res) => {
  return res.render("admin/auth/login");
}

login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).populate({ path: 'permissions' }).exec();

    if (!user) {
      return res.render("admin/auth/login");
    }

    if (!user.checkPassword(password)) {
      return res.render("admin/auth/login");
    }

    // create token
    const token = jwtToken({ _id: user._id });

    res.set("authorization", `Bearer ${token}`);
    req.session.token = token;
    // set URL_AVATAR
    req.session.URL_AVATAR = user.avatar || "/images/avt.png"
    req.app.locals.URL_AVATAR = user.avatar || "/images/avt.png"
    req.app.locals.userLocal = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar || "/images/avt.png",
      permissions: user.permissions.permissions
    }
    const fromURLAdmin = getNodeLocalstorage('fromURLAdmin');
    if (fromURLAdmin) {
      res.redirect(fromURLAdmin);
      removeNodeLocalstorage('fromURLAdmin')
    } else {
      return res.redirect("/admin");
    }
  } catch (er) {
    return res.redirect("/admin/login");
  }
}

module.exports = {
  viewLoginPage,
  login,
}
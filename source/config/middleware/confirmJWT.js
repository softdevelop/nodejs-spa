const mongoose = require("mongoose");
const User = mongoose.model("User");

const { pareJwtToken } = require("../../app/utils/func")

const addToNodeLocalstorage = (key, value) => {
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  localStorage.setItem(key, value);
}

module.exports = async (req, res, next) => {
  const token = req.session.token;
  if (token) {
    let decodedToken;
    try {
      decodedToken = pareJwtToken(token);
      await User.findById(decodedToken._id).then(doc => {
        if (!doc) return new Promise.reject({ message: "User not found" });
        req.user = doc.toJSON();
        next();
      })
    } catch (err) {
      addToNodeLocalstorage('fromURLAdmin', req.originalUrl)
      return res.redirect("/admin/login");
    }
  } else {
    addToNodeLocalstorage('fromURLAdmin', req.originalUrl)
    return res.redirect("/admin/login");
  }
};
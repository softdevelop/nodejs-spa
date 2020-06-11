const mongoose = require("mongoose");
const Staticpage = mongoose.model("Staticpage");

module.exports = async (req, res, next) => {
  let staticpages = await Staticpage.find({ status: 'active' }).select('name slug').exec();
  req.app.locals.staticPages = staticpages
  next();
};

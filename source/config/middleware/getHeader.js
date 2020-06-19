const mongoose = require("mongoose");
const Staticpage = mongoose.model("Staticpage");
const Category = mongoose.model("Category");
const {genCategory} = require('../../app/utils')

module.exports = async (req, res, next) => {
  let staticpages = await Staticpage.find({ status: 'active' }).select('name slug').exec();

  let categories = await Category.getChildrenTree({
    fields: "_id name slug parent path",
    options: { lean: true },
  });

  req.app.locals.staticPages = staticpages
  req.app.locals.categoriesHeaders = genCategory.genCategoryClientHeader(categories)
  next();
};

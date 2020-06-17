const mongoose = require('mongoose');
const Category = mongoose.model('Category')
const New = mongoose.model("New");
const Spa = mongoose.model("Spa");
const moment = require("moment-timezone");
const {genHtmlPagination, urlMediaUpload} = require('../../utils')

const index = async (req, res) => {
  let slug = req.params.slug
  let data = await New.findOne({slug}).populate('spas').exec()
  return res.render("client/news/view",{
    data,
    urlMediaUpload,
    moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
  });
};

module.exports = {
  index,
};

const mongoose = require('mongoose');
const Category = mongoose.model('Category')
const Service = mongoose.model('Service')
const New = mongoose.model("New");
const moment = require("moment-timezone");
const {genHtmlPagination, urlMediaUpload} = require('../../utils')
const truncate = require('html-truncate');

const {
  constants
} = require("../../utils");
const index = async (req, res) => {

  let categoryLevel1 = await Category.getChildrenTree({
    fields: "_id name slug parent path",
    options: { lean: false },
  });

  let services = await Service.find({ status: 'active'}).select('title').populate({
    path: 'spaservice',
    select: 'title _id spa_id',
    populate: 'spa'
  }).lean();

  let { page, limit } = req.query;
  let search = req.query.search || '';
  let text = '.*'+search.split(' ').join('.*')+'.*'
  let reg = new RegExp(text);
  var query = {
    name: { $regex: reg, $options: 'gmi' },
  };
  var options = {
    select: "", //"username email"
    sort: { createdAt: -1 },
    lean: true,
    limit: parseInt(limit, 10) || 10,
    page: parseInt(page, 10) || 1,
    populate: [{
      path: 'spas',
    },{
      path: 'user',
      select: 'last_name first_name'
    }
  ]
  };
  let data = await New.paginate(query, options);
  data.search = search
  

  res.render("client/homes/index", {
    categoryLevel1,
    data,
    services,
    urlMediaUpload,
    moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
    genHtmlPagination: genHtmlPagination(data.total, data.limit, data.page, data.pages, data.search),
    categoryLevel1,
    truncate,
    locationsArr: constants.locationsArr
  });
};

module.exports = {
  index,
};

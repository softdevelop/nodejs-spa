const mongoose = require('mongoose');
const Category = mongoose.model('Category')
const Service = mongoose.model('Service')
const New = mongoose.model("New");
const Expert = mongoose.model("Expert");
const Discount = mongoose.model("Discount");
const moment = require("moment-timezone");
const {genHtmlPaginationClient, urlMediaUpload, genCategory} = require('../../utils')
const truncate = require('html-truncate');

const { constants } = require("../../utils");
const index = async (req, res) => {


  let categories = await Category.getChildrenTree({
    fields: "_id name slug parent path",
    options: { lean: true },
  });


  let services = await Service.find({ status: 'active'}).select('title').populate({
    path: 'spaservice',
    select: 'title _id spa_id',
    populate: 'spa',
    options: {
      limit: 10
    }
  }).lean();


  const startOfWeek = moment().startOf('isoWeek').toISOString();
  const endOfWeek = moment().endOf('isoWeek').toISOString();
  let discount = await await Discount.find(
    {
      $or: [{date_start: { $gte: startOfWeek,$lte: endOfWeek }},
            {date_end: { $gte: startOfWeek,$lte: endOfWeek  }}],
      status:'active'
    }
    ).populate([
      {
        path:'spa'
      },
      {
        path: 'spaservice',
        populate:{
          path:'service'
        }
      }
    ]).exec();

  let { limit } = req.query;
  let page = req.params.page
  let search = req.query.search || '';
  let text = '.*'+search.split(' ').join('.*')+'.*'
  let reg = new RegExp(text);
  var query = {
    name: { $regex: reg, $options: 'gmi' },
    status: 'active'
  };
  var options = {
    select: "", //"username email"
    sort: { createdAt: -1 },
    lean: true,
    limit: parseInt(limit, 10) || 12,
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
  let newsLatest = await New.find().limit(3).exec();

  let experts = await Expert.find().populate('user').lean();
  // return res.send(experts)
  res.render("client/homes/index", {
    discount,
    data,
    services,
    urlMediaUpload,
    moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
    genHtmlPaginationClient: genHtmlPaginationClient(data.total, data.limit, data.page, data.pages, data.search, 'center'),
    categories,
    truncate,
    locationsArr: constants.locationsArr,
    genCategory: genCategory.genCategoryClient(categories),
    newsLatest,
    experts
  });
};

module.exports = {
  index,
};

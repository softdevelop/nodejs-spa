const mongoose = require('mongoose');
const Category = mongoose.model('Category')
const New = mongoose.model("New");
const Spa = mongoose.model("Spa");
const moment = require("moment-timezone");
const Service = mongoose.model('Service')
const {genHtmlPaginationClient, urlMediaUpload, genCategory} = require('../../utils')
const truncate = require('html-truncate');
const {
  constants
} = require("../../utils");
const view = async (req, res) => {
  try{
    let slug = req.params.slug
    let data = await New.findOne({slug, status:'active'}).populate('spas').exec()
    data.numOfViews = data.numOfViews + 1;
    await data.save();

    let categories = await Category.getChildrenTree({
      fields: "_id name slug parent path",
      options: { lean: true },
    });
    let newsLatest = await New.find().limit(3).exec();
    return res.render("client/news/view",{
      data,
      urlMediaUpload,
      moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
      genCategory: genCategory.genCategoryClient(categories),
      newsLatest
    });
  }catch(e){
    return res.render('client/404')
  }
};

const index = async(req, res)=>{

  let categories = await Category.getChildrenTree({
    fields: "_id name slug parent path",
    options: { lean: true },
  });

  let services = await Service.find({ status: 'active'}).select('title').populate({
    path: 'spaservice',
    select: 'title _id spa_id',
    populate: 'spa'
  }).lean();

  let { limit } = req.query;
  let page = req.params.page
  let categorySlug = req.query['danh-muc'];
  let category = null;
  if(categorySlug) category = await Category.findOne({slug: categorySlug}).exec();
  let search = req.query.search || '';
  let text = '.*'+search.split(' ').join('.*')+'.*'
  let reg = new RegExp(text);
  var query = {
    name: { $regex: reg, $options: 'gmi' },
    status: 'active'
  };
  if(category) query.category_ids = { $elemMatch: { $eq: ''+category._id}}
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
  res.render('client/news/index', {
     data,
    services,
    urlMediaUpload,
    moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
    genHtmlPaginationClient: genHtmlPaginationClient(data.total, data.limit, data.page, data.pages, data.search, 'center'),
    categories,
    truncate,
    locationsArr: constants.locationsArr,
    genCategory: genCategory.genCategoryClient(categories),
    newsLatest
  })
}

module.exports = {
  view,
  index
};

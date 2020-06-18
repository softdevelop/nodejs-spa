const mongoose = require('mongoose');
const Category = mongoose.model('Category')
const Service = mongoose.model('Service')
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

  res.render("client/homes/index", {
    categoryLevel1,
    locationsArr: constants.locationsArr,
    services
  });
};

module.exports = {
  index,
};

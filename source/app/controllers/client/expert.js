const mongoose = require('mongoose');
const Expert = mongoose.model("Expert");
const New = mongoose.model("New");
const {genHtmlPaginationClient, urlMediaUpload, genCategory} = require('../../utils')
const truncate = require('html-truncate');

const index = async (req, res) => {
  let experts = await Expert.find().populate('user').lean();
  res.render("client/experts/index", {
    experts,
    urlMediaUpload
  });
};

const view = async (req, res) => {
  let slug = req.params.slug
  let expert = await Expert.findOne({slug}).populate('user').populate('services').exec();
  let user_id = expert.user_id;
  let news = await New.find({author:user_id, status:'active'}).exec();
  // return res.send(expert)
  res.render("client/experts/view", {
    expert,
    urlMediaUpload,
     news,
     truncate
  });
};

module.exports = {
  index,
  view,
};

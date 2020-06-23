const mongoose = require('mongoose');
const Expert = mongoose.model("Expert");
const {genHtmlPaginationClient, urlMediaUpload, genCategory} = require('../../utils')

const index = async (req, res) => {
  let experts = await Expert.find().populate('user').lean();
  res.render("client/experts/index", {
    experts,
    urlMediaUpload
  });
};

const view = async (req, res) => {
  let slug = req.params.slug
  let expert = await Expert.findOne({slug}).populate('user').exec();
  console.log('expert', expert);
  console.log('expert', expert.user);
  res.render("client/experts/view", {
    expert,
    urlMediaUpload
  });
};

module.exports = {
  index,
  view,
};
const {
  constants,
  urlMediaUpload
} = require("../../utils");
const mongoose = require('mongoose');
const Spa = mongoose.model('Spa')

const index = async (req, res) => {
  let spas = await Spa.find({ status: 'active'}).exec();
  res.render("client/search/index", { 
    errors: {}, 
    data: spas, 
    locationsArr: constants.locationsArr,
    query: req.query,
    urlMediaUpload
  });
};
module.exports = {
  index,
};

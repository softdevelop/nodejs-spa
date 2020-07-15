const {
  constants,
  urlMediaUpload
} = require("../../utils");
const mongoose = require('mongoose');
const Spa = mongoose.model('Spa')
const truncate = require('html-truncate');
const { dataProvince, dataDistrict } = require("../../utils/location");
const index = async (req, res) => {
let spas = await Spa.find({ status: 'active', location: new RegExp(req.query.location)}).exec();
  res.render("client/search/index", { 
    errors: {}, 
    dataProvince, 
    dataDistrict,
    data: spas, 
    locationsArr: constants.locationsArr,
    query: req.query,
    urlMediaUpload,
    truncate
  });
};
module.exports = {
  index,
};

const mongoose = require("mongoose")
const Spa = mongoose.model("Spa");
const {genHtmlPagination, urlMediaUpload} = require('../../utils')



const getListSpa = async(req, res) => {
   let data = await Spa.find({}).exec();
   return   res.render('client/homes/index',{
    data,
    urlMediaUpload
  })

}



  module.exports = {
    getListSpa
  }
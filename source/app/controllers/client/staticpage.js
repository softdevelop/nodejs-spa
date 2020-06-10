const mongoose = require("mongoose");
const Staticpage = mongoose.model("Staticpage");

const index = async (req, res) => {
  let slug = req.params.slug
  let page = await Staticpage.findOne({slug}).exec();
  if(page){
    res.render('client/staticpages/index', {page})
  }else{
    res.render('client/404')
  }
}

module.exports = {
  index
}
const mongoose = require('mongoose');
const Category = mongoose.model('Category')
const Spa = mongoose.model('Spa')
const {genHtmlPagination, urlMediaUpload} = require('../../utils')

const landingPage = async (req, res) => {

  let slug = req.params.slug
  let spaDetail = await Spa.findOne({slug, status: 'active'}).populate('intros').populate('services').populate('members').exec();
  if(spaDetail){
    let template_id = spaDetail.template_id || '1';
    // res.sendData(spaDetail);
    res.render("template/"+template_id, {
      spaDetail,
      urlMediaUpload
    });
  }else{
    res.render("client/404")
  }

};

module.exports = {
  landingPage,
};

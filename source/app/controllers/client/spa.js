const mongoose = require('mongoose');
const Category = mongoose.model('Category')
const Spa = mongoose.model('Spa')

const landingPage = async (req, res) => {

  let slug = req.params.slug
  let spaDetail = await Spa.findOne({slug}).populate('intros').populate('services').populate('members').exec();
  let template_id = spaDetail.template_id;
  // res.sendData(spaDetail);
  res.render("template/"+template_id, {
    spaDetail
  });
};

module.exports = {
  landingPage,
};

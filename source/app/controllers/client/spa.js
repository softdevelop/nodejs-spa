const mongoose = require('mongoose');
const Category = mongoose.model('Category')
const Spa = mongoose.model('Spa')
const Booking = mongoose.model('Booking')
const {genHtmlPagination, urlMediaUpload} = require('../../utils')
const truncate = require('html-truncate');

const landingPage = async (req, res) => {
  let slug = req.params.slug
  let spaDetail = await Spa.findOne({slug, status: 'active'}).populate('intros').populate({
    path: 'services',
    populate: {
      path: 'service'
    }
  }).populate('members').exec();
  if(spaDetail){
    let template_id = spaDetail.template_id || '1';
    res.render("template/"+template_id, {
      spaDetail,
      urlMediaUpload,
      truncate
    });
  }else{
    res.render("client/404")
  }
};

const booking = async (req, res) => {
  let data = req.body
  let slug = req.params.slug
  let spa = await Spa.findOne({slug, status: 'active'}).exec();
  data.spa_id = spa._id
  let newBooking = new Booking(data);
  newBooking.save()
    .then((e) => {
      res.redirect("/spa/"+slug);
    })
    .catch((e) => {
      console.log('eee', e);
    });
}

module.exports = {
  landingPage,
  booking
};

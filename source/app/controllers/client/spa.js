const mongoose = require('mongoose');
const Category = mongoose.model('Category')
const Spa = mongoose.model('Spa')
const Booking = mongoose.model('Booking')
const Discount = mongoose.model('Discount')
const { genHtmlPagination, urlMediaUpload } = require('../../utils')
const truncate = require('html-truncate');
const { validateBooking, validateBookingEdit } = require('../../models/bookings')

const landingPage = async(req, res) => {

    let id_discount = req.params.idDiscount; // discount
    // let discount = await Discount.findOne({ _id: id_discount }).exec()
    // if(!discount) discount = {}
    let slug = req.params.slug
    let spaDetail = await Spa.findOne({ slug, status: 'active' }).populate('intros').populate({
        path: 'services',
        populate: {
            path: 'service'
        }
    }).populate('members').exec();
    if (spaDetail) {
        let template_id = spaDetail.template_id || '1';
        res.render("template/" + template_id, {
            spaDetail,
            urlMediaUpload,
            truncate,
            discount:{}
        });
    } else {
        res.render("client/404")
    }
};

const booking = async(req, res) => {
    let data = req.body
    let slug = req.params.slug
    let spa = await Spa.findOne({ slug, status: 'active' }).exec();
    data.spa_id = spa.id
    data.status = 'pending';
    let err = validateBooking(data);
    console.log(err);

    let newBooking = new Booking(data);
    newBooking.save()
        .then((e) => {
            res.redirect("/spa/" + slug);
        })
        .catch((e) => {
            console.log('eee', e);
        });
}

module.exports = {
    landingPage,
    booking
};
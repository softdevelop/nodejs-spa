const mongoose = require("mongoose");
const Booking = mongoose.model("Booking");
const Spa = mongoose.model("Spa");
const User = mongoose.model("User");
const SpaService = mongoose.model("SpasService");
const moment = require("moment-timezone");
const {genHtmlPagination, urlMediaUpload} = require('../../utils')
const {validateBooking, validateBookingEdit} = require('../../models/bookings')
const bcrypt = require("bcryptjs");

const APP_DOMAIN = require("../../../config/index").APP_DOMAIN;
const dashboardUrl = () => APP_DOMAIN + `/dashboard`;
mongoose.Promise = global.Promise;

const getListBooking = async (req, res) => {
  if (req.user) {
    let { page, limit } = req.query;
    let search = req.query.search || '';
    let text = '.*'+search.split(' ').join('.*')+'.*'
    let reg = new RegExp(text);
    var query = {
      name: { $regex: reg, $options: 'gmi' },
    };
    var options = {
      select: "", //"username email"
      sort: { createdAt: -1 },
      lean: true,
      limit: parseInt(limit, 10) || 10,
      page: parseInt(page, 10) || 1,
      populate: [{
        path: 'spas',
      },{
        path: 'services',
        populate:{
          path: 'service'
        }
      }],
    };
    let data = await Booking.paginate(query, options);
    
    data.search = search
    // return res.send(data)
    return res.render("admin/booking/index", {
      data,
      urlMediaUpload,
      moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
      genHtmlPagination: genHtmlPagination(data.total, data.limit, data.page, data.pages, data.search),
    });
  } else {
    console.log('err', req.err);
  }
};

const getFormCreate = async (req, res) => {
  var spas = await Spa.find().select('_id name').populate({
    path: "services",
    select: "_id title service_id service",
    populate:{
      path:'service',
      select:"title"
    }
  }).exec()
  res.render('admin/booking/create', {errors: {}, data:  spas})
}

const create = async (req, res) => {
  let data = req.body;
  delete data.files;
  let err = validateBooking(data);
  
  let spas = await Spa.find().select('_id name').populate({
    path: "services",
    select: "_id title service_id service",
    populate:{
      path:'service',
      select:"title"
    }
  }).exec()
  if (err && err.error) {
    let errors =
      err.error &&
      err.error.details.reduce((result, item) => {
        return {
          ...result,
          [item.path[0]]: item.message,
        };
      }, {});
      
    
    res.render('admin/booking/create', {errors, data:  spas})
  } else {
    let newBooking = new Booking(data);
    newBooking.save()
      .then((e) => {
        res.redirect("/admin/booking");
      })
      .catch((e) => {
        return res.render("admin/booking/create", {
          errors: {
            name: "The value is duplicated.",
            slug: "The value is duplicated.",
          },
          data:spas,
        });
      });
  }
};


const getFormEdit = async (req, res) => {
  let id = req.params.id;
  
  // let booking = await Booking.findOne().populate('spas').exec()
  let booking = await Booking.findOne({_id: id}).populate([
    {
      path:'spas',
      select:'_id name'
    },
    {
      path:'services',
      populate:{
        path:'service',
        select:'title'
      }
    }
  ]).exec();
  var spas = await Spa.find().select('_id name').populate({
    path: "services",
    select: "_id title service_id service",
    populate:{
      path:'service',
      select:"title"
    }
  }).exec()
  let services = await  SpaService.find({spa_id : booking.spas._id}).populate({
    path:'service',
    select:'title'
  }).exec()
  res.render('admin/booking/edit', {errors: {}, data: booking, spas,services})
};


const edit = async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  delete data.files;

  let err = validateBookingEdit(data);
  console.log(err)
  
  if (err && err.error) {
    let errors =
      err.error &&
      err.error.details.reduce((result, item) => {
        return {
          ...result,
          [item.path[0]]: item.message,
        };
      }, {});
    return res.render("admin/booking/edit", { errors, data });
  } else {
    await Booking.findById(id).update(data);
    res.redirect("/admin/booking");
  }
};

const delMany = async (req, res) => {
  try {
    let ids = req.body.ids;
    ids.map(async val => {
      const book = await Booking.deleteOne({ _id: val }, (err, result) => {
        if (err) return res.status(400).json({ status: "error" });
      }).exec();
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};
const viewDetail = async (req, res) => {
  let id = req.params.id
  let booking = await Booking.findOne({_id: id}).populate([
    {
      path:'services',
      populate:{
        path:'service',
        select: 'title'
      }
    },
    {
      path:'spas',
      select:'name'
    }
  ]).exec()
  res.render('admin/booking/view', {errors: {}, data: booking})
}

const getListBookingOfSpa = async (req, res) => {
  if (req.user) {
    let id = req.user._id
    let spa = await Spa.findOne({owner: id}).populate('ownerDetail').exec();
    let { page, limit } = req.query;
    let search = req.query.search || '';
    let text = '.*'+search.split(' ').join('.*')+'.*'
    let reg = new RegExp(text);
    var query = {
      name: { $regex: reg, $options: 'gmi' },
      spa_id : spa._id
    };
    var options = {
      select: "", //"username email"
      sort: { createdAt: -1 },
      lean: true,
      limit: parseInt(limit, 10) || 10,
      page: parseInt(page, 10) || 1,
      populate: [{
        path: 'spas',
      },{
        path: 'services',
        populate:{
          path: 'service'
        }
      }],
    };
    let data = await Booking.paginate(query, options);
    
    data.search = search
    // return res.send(data)
    return res.render("admin/booking/ofSpa/index", {
      data,
      urlMediaUpload,
      moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
      genHtmlPagination: genHtmlPagination(data.total, data.limit, data.page, data.pages, data.search),
    });
  } else {
    console.log('err', req.err);
  }

};
const getFormEditOfSpa = async (req, res) => {
  let id = req.params.id;
  let id_user = req.user._id
  let spa = await Spa.findOne({owner: id_user}).populate('ownerDetail').exec();
  let booking = await Booking.findOne({_id: id}).populate([
    {
      path:'spas',
      select:'_id name'
    },
    {
      path:'services',
      populate:{
        path:'service',
        select:'title'
      }
    }
  ]).exec();
  if(spa._id!=booking.spa_id){ // security
    res.render('admin/404');
  }
  var spas = await Spa.find().select('_id name').populate({
    path: "services",
    select: "_id title service_id service",
    populate:{
      path:'service',
      select:"title"
    }
  }).exec()
  let services = await  SpaService.find({spa_id : booking.spas._id}).populate({
    path:'service',
    select:'title'
  }).exec()
  res.render('admin/booking/ofSpa/edit', {errors: {}, data: booking, spas,services})


  // let id = req.params.id;
  // let booking = await Booking.findOne({_id: id}).populate('services').populate('spas').exec()
  // let spas = await Spa.find().populate("services").exec()
  // let services = spas.find(item => item._id == booking.spa_id);
  // res.render('admin/booking/ofSpa/edit', {errors: {}, data: booking, spas, services})
};

const editOfSpa = async (req, res) => {
  let id = req.params.id;

  let id_user = req.user._id
  let spa = await Spa.findOne({owner: id_user}).populate('ownerDetail').exec();
  let booking = await Booking.findById(id).exec()
  if(spa._id!=booking.spa_id){ // security
    res.render('admin/404');
  }

  let data = req.body;
  delete data.files;
  let err = validateBookingEdit(data);
  console.log(err)
  if (err && err.error) {
    let errors =
      err.error &&
      err.error.details.reduce((result, item) => {
        return {
          ...result,
          [item.path[0]]: item.message,
        };
      }, {});
    return res.render("admin/booking/ofSpa/edit", { errors, data });
  } else {
    await Booking.findById(id).update(data);
    res.redirect("/admin/spas/bookings");
  }
};
const viewDetailOfSpa = async (req, res) => {
  let id = req.params.id
  let booking = await Booking.findOne({_id: id}).populate('services').populate('spas').exec()
  let spas = await Spa.find().populate("services").exec()
  let services = spas.find(item => item._id == booking.spa_id);
  res.render('admin/booking/ofSpa/view', {errors: {}, data: booking, spas, services})
}


module.exports = {
getListBooking,
getFormCreate,
create,
getFormEdit,
edit,
delMany,
viewDetail,
getListBookingOfSpa,
getFormEditOfSpa,
editOfSpa,
viewDetailOfSpa
};
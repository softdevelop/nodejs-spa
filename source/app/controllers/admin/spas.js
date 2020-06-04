const mongoose = require("mongoose");
const Spa = mongoose.model("Spa");
const User = mongoose.model("User");
const moment = require("moment-timezone");
const {genHtmlPagination, urlMediaUpload} = require('../../utils')
const {validateSpa, validateSpaEdit} = require('../../models/spas')
const bcrypt = require("bcryptjs");

const APP_DOMAIN = require("../../../config/index").APP_DOMAIN;
const dashboardUrl = () => APP_DOMAIN + `/dashboard`;
mongoose.Promise = global.Promise;

const getListSpas = async (req, res) => {
  if (req.user) {
    let { page, limit } = req.query;
    let search = req.query.search || '';
    let text = '.*'+search.split(' ').join('.*')+'.*'
    let reg = new RegExp(text);
    var query = {
      name: { $regex: reg, $options: 'gmi' },
      description: { $regex: reg, $options: 'gmi' }
    };
    var options = {
      select: "", //"username email"
      sort: { createdAt: -1 },
      lean: true,
      limit: parseInt(limit, 10) || 10,
      page: parseInt(page, 10) || 1
    };
    let data = await Spa.paginate(query, options);
    data.search = search
    return res.render("admin/spas/index", {
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
  let spaOwners = await User.find({role: "SPA_OWNER"}).exec();
  res.render('admin/spas/create', {errors: {}, data: {}, spaOwners})
}

const create = async (req, res) => {
  let data = req.body
  let err = validateSpa(data)
  if(err && err.error){
    let errors = err.error && err.error.details.reduce((result, item)=>{
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    return res.sendError({errors, data})
  }else{
    if(req.files.logo){
      data.logo = req.files.logo[0]
    }
    let newSpa = new Spa(data)
    newSpa.save().then((e)=>{
      return res.sendData({ status: 'Success'})
    }).catch(e=>{
      return res.sendError({errors: {name: 'The value is duplicated.', slug: 'The value is duplicated.'}})
    })
  }
}

const getFormEdit = async (req, res) => {
  let id = req.params.id
  let record = await Spa.findById(id).exec();
  let spaOwners = await User.find({role: "SPA_OWNER"}).exec();
  res.render('admin/spas/edit', {errors: {}, data: record, urlMediaUpload, spaOwners})
}

const edit = async (req, res) => {
  let id = req.params.id
  let data = req.body
  delete data.logo
  let err = validateSpaEdit(data)
  if(err && err.error){
    let errors = err.error && err.error.details.reduce((result, item)=>{
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    data._id = id
    return res.sendError({errors, data})
  }else{
    if(req.files.logo && req.files.logo[0]){
      data.logo = req.files.logo[0]
    }else delete data.logo

    await Spa.findById(id).update(data);
    return res.sendData({ status: 'Success'})
  }
}

delMany = async (req, res) => {
  try {
    let ids = req.body.ids;
    ids.map(async val => {
      const user = await Spa.deleteOne({ _id: val }, (err, result) => {
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
  let record = await Spa.findById(id).exec();
  let spaOwners = await User.find({role: "SPA_OWNER"}).exec();
  res.render('admin/spas/view', {errors: {}, data: record, urlMediaUpload, spaOwners})
}

module.exports = {
  getListSpas,
  getFormCreate,
  create,
  getFormEdit,
  edit,
  delMany,
  viewDetail
};

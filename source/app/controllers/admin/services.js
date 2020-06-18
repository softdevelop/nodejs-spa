const mongoose = require("mongoose");
const Service = mongoose.model("Service");
const Role = mongoose.model("Role");
const moment = require("moment-timezone");
const {genHtmlPagination, urlMediaUpload} = require('../../utils')
const {validateService, validateServiceEdit} = require('../../models/services')

const APP_DOMAIN = require("../../../config/index").APP_DOMAIN;
const dashboardUrl = () => APP_DOMAIN + `/dashboard`;
mongoose.Promise = global.Promise;

const getListServices = async (req, res) => {
    let { page, limit } = req.query;
    let search = req.query.search || '';
    let text = '.*'+search.split(' ').join('.*')+'.*'
    let reg = new RegExp(text);
    var query = {
      title: { $regex: reg, $options: 'gmi' },
      content: { $regex: reg, $options: 'gmi' }
    };
    var options = {
      select: "", //"username email"
      sort: { createdAt: -1 },
      lean: true,
      limit: parseInt(limit, 10) || 10,
      page: parseInt(page, 10) || 1
    };
    let data = await Service.paginate(query, options);
    data.search = search
    return res.render("admin/services/index", {
      data,
      urlMediaUpload,
      moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
      genHtmlPagination: genHtmlPagination(data.total, data.limit, data.page, data.pages, data.search),
    });
};

const getFormCreate = async (req, res) => {
  let roles = await Role.find().select('name value').exec();
  res.render('admin/services/create', {errors: {}, data: {}, roles})
}

const create = async (req, res) => {
  let data = req.body
  if(req.files.image){
    data.image = req.files.image[0]
  }
  let err = validateService(data)
  if(err && err.error){
    let errors = err.error && err.error.details.reduce((result, item)=>{
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    let roles = await Role.find().select('name value').exec();
    return res.render('admin/services/create', {errors, data, roles})
  }else{
    let newService = new Service(data)
    newService.save().then((e)=>{
      res.redirect('/admin/services')
    }).catch(e=>{
      console.log('catch', e);
    })
  }
}

const getFormEdit = async (req, res) => {
  let id = req.params.id
  let record = await Service.findById(id).exec();
  res.render('admin/services/edit', {errors: {}, data: record, urlMediaUpload})
}

const edit = async (req, res) => {
  let id = req.params.id
  let data = req.body
  let err = validateServiceEdit(data)
  if(err && err.error){
    let errors = err.error && err.error.details.reduce((result, item)=>{ 
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    data._id = id
    let roles = await Role.find().select('name value').exec();
    return res.render('admin/services/edit', {errors, data, urlMediaUpload, roles})
  }else{
    if(req.files.image && req.files.image[0]){
      data.image = req.files.image[0]
    }else delete data.image

    await Service.findById(id).update(data);
    res.redirect('/admin/services')
  }
}

delMany = async (req, res) => {
  try {
    let ids = req.body.ids;
    ids.map(async val => {
      const user = await Service.deleteOne({ _id: val }, (err, result) => {
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
  let record = await Service.findById(id).exec();
  res.render('admin/services/view', {errors: {}, data: record, urlMediaUpload})
}

module.exports = {
  getListServices,
  getFormCreate,
  create,
  getFormEdit,
  edit,
  delMany,
  viewDetail,
};

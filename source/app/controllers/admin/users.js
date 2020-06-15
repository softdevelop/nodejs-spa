const mongoose = require("mongoose");
const User = mongoose.model("User");
const moment = require("moment-timezone");
const {genHtmlPagination, urlMediaUpload} = require('../../utils')
const {validateUser, validateUserEdit} = require('../../models/users')
const bcrypt = require("bcryptjs");

const APP_DOMAIN = require("../../../config/index").APP_DOMAIN;
const dashboardUrl = () => APP_DOMAIN + `/dashboard`;
mongoose.Promise = global.Promise;

const getListUsers = async (req, res) => {
  if (req.user) {
    let { page, limit } = req.query;
    let search = req.query.search || '';
    let text = '.*'+search.split(' ').join('.*')+'.*'
    let reg = new RegExp(text);
    var query = {
      email: { $regex: reg, $options: 'gmi' }
    };
    var options = {
      select: "", //"username email"
      sort: { createdAt: -1 },
      lean: true,
      limit: parseInt(limit, 10) || 10,
      page: parseInt(page, 10) || 1
    };
    let data = await User.paginate(query, options);
    data.search = search
    return res.render("admin/users/index", {
      data,
      urlMediaUpload,
      moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
      genHtmlPagination: genHtmlPagination(data.total, data.limit, data.page, data.pages, data.search),
    });
  } else {
    console.log('err', req.err);
  }
};

const getFormCreate = (req, res) => {
  res.render('admin/users/create', {errors: {}, data: {}})
}

const create = async (req, res) => {
  let data = req.body
  let err = validateUser(data)
  if(err && err.error){
    let errors = err.error && err.error.details.reduce((result, item)=>{
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    return res.render('admin/users/create', {errors, data})
  }else{
    if(req.files.avatar){
      data.avatar = req.files.avatar[0]
    }
    data.password = bcrypt.hashSync(data.password, 10);
    let newUser = new User(data)
    newUser.save().then((e)=>{
      res.redirect('/admin/users')
    }).catch(e=>{
      console.log('catch', e);
    })
  }
}

const getFormEdit = async (req, res) => {
  let id = req.params.id
  let record = await User.findById(id).exec();
  res.render('admin/users/edit', {errors: {}, data: record, urlMediaUpload})
}

const edit = async (req, res) => {
  let id = req.params.id
  let data = req.body
  let err = validateUserEdit(data)
  if(err && err.error){
    let errors = err.error && err.error.details.reduce((result, item)=>{
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    data._id = id
    return res.render('admin/users/edit', {errors, data, urlMediaUpload})
  }else{
    if(req.files.avatar && req.files.avatar[0]){
      data.avatar = req.files.avatar[0]
    }else delete data.avatar

    if(data.password && data.password == '') delete data.password
    else data.password = bcrypt.hashSync(data.password, 10);
    await User.findById(id).update(data);
    res.redirect('/admin/users')
  }
}

delMany = async (req, res) => {
  try {
    let ids = req.body.ids;
    ids.map(async val => {
      const user = await User.deleteOne({ _id: val }, (err, result) => {
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
  let record = await User.findById(id).exec();
  res.render('admin/users/view', {errors: {}, data: record, urlMediaUpload})
}

module.exports = {
  getListUsers,
  getFormCreate,
  create,
  getFormEdit,
  edit,
  delMany,
  viewDetail,
  
};

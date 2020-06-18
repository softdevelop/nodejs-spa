const mongoose = require("mongoose");
const User = mongoose.model("User");
const Role = mongoose.model("Role");
const Permission = mongoose.model("Permission");
const moment = require("moment-timezone");
const {genHtmlPagination, urlMediaUpload, constants} = require('../../utils')
const {validateRole, validateRoleEdit} = require('../../models/roles')
const bcrypt = require("bcryptjs");

const APP_DOMAIN = require("../../../config/index").APP_DOMAIN;
const dashboardUrl = () => APP_DOMAIN + `/dashboard`;
mongoose.Promise = global.Promise;

const getListRoles = async (req, res) => {
  let data = await Role.find({}).exec();
  return res.render("admin/roles/index", {
    data
  });
};

const getFormEdit = async (req, res) => {
  let value = req.params.value
  let record = await Role.findOne({value}).exec();
  // let permissions = await Permission.find().exec();
  let permissions = constants.permissions;
  res.render('admin/roles/edit', {errors: {}, data: record, permissions})
}

const edit = async (req, res) => {
  let value = req.params.value
  let data = req.body
  if(!data.permissions) data.permissions = []

  let err = validateRoleEdit(data)
  if(err && err.error){
    let errors = err.error && err.error.details.reduce((result, item)=>{
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    return res.render('admin/roles/edit', {errors, data})
  }else{
    let currentRole = await Role.findOne({value}).exec();
    roleValue = currentRole.value;
    await currentRole.update(data).then(async e=>{
      await User.find({ role: roleValue}).update({ role: data.value})
      res.redirect('/admin/roles')
    }).catch(async e=>{
      // let permissions = await Permission.find().exec();
      let permissions = constants.permissions;
      return res.render('admin/roles/create', {errors: {name: 'The value is duplicated.', value: 'The value is duplicated.'}, data, permissions})
    })
  }
}

const getFormCreate = async (req, res) => {
  // let permissions = await Permission.find().exec();
  let permissions = constants.permissions;

  res.render('admin/roles/create', {errors: {}, permissions, data: {}})
}

const create = async (req, res) => {
  let data = req.body
  let err = validateRole(data)
  if(err && err.error){
    let errors = err.error && err.error.details.reduce((result, item)=>{
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    // let permissions = await Permission.find().exec();
    let permissions = constants.permissions;
    return res.render('admin/roles/create', {errors, data, permissions})
  }else{
    let newRole = new Role(data)
    newRole.save().then((e)=>{
      res.redirect('/admin/roles')
    }).catch(async e=>{
      // let permissions = await Permission.find().exec();
      let permissions = constants.permissions;
      return res.render('admin/roles/create', {errors: {name: 'The value is duplicated.', value: 'The value is duplicated.'}, data, permissions})
    })
  }
}

delMany = async (req, res) => {
  try {
    let ids = req.body.ids;
    ids.map(async val => {
      const user = await Role.deleteOne({ _id: val }, (err, result) => {
        if (err) return res.status(400).json({ status: "error" });
      }).exec();
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

const viewDetail = async (req, res) => {
  let value = req.params.value
  let record = await Role.findOne({value}).exec();
  if(record){
    // let permissions = await Permission.find().exec();
    let permissions = constants.permissions;
    res.render('admin/roles/view', {errors: {}, data: record, permissions})
  }else{
    res.render('admin/404')
  }
}

module.exports = {
  getListRoles,
  getFormEdit,
  edit,
  getFormCreate,
  create,
  delMany,
  viewDetail
};

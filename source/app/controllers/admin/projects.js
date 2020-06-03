const mongoose = require("mongoose");
const Project = mongoose.model("Project");
const moment = require("moment-timezone");
const {genHtmlPagination, urlMediaUpload} = require('../../utils')
const {validateProject, validateProjectEdit} = require('../../models/projects')
const bcrypt = require("bcryptjs");

const APP_DOMAIN = require("../../../config/index").APP_DOMAIN;
const dashboardUrl = () => APP_DOMAIN + `/dashboard`;
mongoose.Promise = global.Promise;

const getListProjects = async (req, res) => {
  let { page, limit } = req.query;
  var query = {
    // email: 'danh@gmail.com'
  };
  var options = {
    select: "", //"projectname email"
    sort: { createdAt: -1 },
    lean: true,
    limit: parseInt(limit, 10) || 10,
    page: parseInt(page, 10) || 1,
    populate: [{
      path: 'user',
      select: 'first_name last_name'
    }],
  };
  let data = await Project.paginate(query, options);

  return res.render("admin/projects/index", {
    data,
    urlMediaUpload,
    moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
    genHtmlPagination: genHtmlPagination(data.total, data.limit, data.page, data.pages),
  });
};

const getFormCreate = (req, res) => {
  res.render('admin/projects/create', {errors: {}, data: {}})
}

const create = async (req, res) => {
  let data = req.body
  data.createdBy = req.user._id
  let err = validateProject(data)
  if(err && err.error){
    let errors = err.error && err.error.details.reduce((result, item)=>{
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    res.sendData({errors, data})
  }else{
    if(req.files.imgs){
      data.imgs = req.files.imgs
    }
    let newProject = new Project(data)
    newProject.save().then((e)=>{
      res.sendData('Success')
    }).catch(e=>{
      res.sendError(e)
    })
  }
}

const getFormEdit = async (req, res) => {
  let id = req.params.id
  let record = await Project.findById(id).exec();
  res.render('admin/projects/edit', {errors: {}, data: record, urlMediaUpload})
}

const edit = async (req, res) => {
  let id = req.params.id
  let data = req.body
  let err = validateProjectEdit(data)
  if(err && err.error){
    let errors = err.error && err.error.details.reduce((result, item)=>{
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    data._id = id
    return res.render('admin/projects/edit', {errors, data, urlMediaUpload})
  }else{
    if(req.files.avatar && req.files.avatar[0]){
      data.avatar = req.files.avatar[0]
    }else delete data.avatar

    if(data.password && data.password == '') delete data.password
    else data.password = bcrypt.hashSync(data.password, 10);
    await Project.findById(id).update(data);
    res.redirect('/admin/projects')
  }
}

delMany = async (req, res) => {
  try {
    let ids = req.body.ids;
    ids.map(async val => {
      const project = await Project.deleteOne({ _id: val }, (err, result) => {
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
  let record = await Project.findById(id).exec();
  res.render('admin/projects/view', {errors: {}, data: record, urlMediaUpload})
}

module.exports = {
  getListProjects,
  getFormCreate,
  create,
  getFormEdit,
  edit,
  delMany,
  viewDetail
};

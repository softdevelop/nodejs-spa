const mongoose = require("mongoose");
const Expert = mongoose.model("Expert");
const User = mongoose.model("User");
const moment = require("moment-timezone");
const {genHtmlPagination, urlMediaUpload,genCategory} = require('../../utils')
const {validateExpert, validateExpertEdit} = require('../../models/experts')
const bcrypt = require("bcryptjs");
const { job } = require("cron");

const APP_DOMAIN = require("../../../config/index").APP_DOMAIN;
const dashboardUrl = () => APP_DOMAIN + `/dashboard`;
mongoose.Promise = global.Promise;

const getListExpert = async (req, res) => {
    if (req.user) {
      let { page, limit } = req.query;
      let search = req.query.search || '';
      let text = '.*'+search.split(' ').join('.*')+'.*'
      let reg = new RegExp(text);
      var query = {
       
      };
      var options = {
        select: "", //"username email"
        sort: { createdAt: -1 },
        lean: true,
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        populate: [{
          path: 'user',
        }]
      };
      let data = await Expert.paginate(query, options);
      data.search = search
      return res.render("admin/experts/index", {
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
    var user = await User.find().select('_id first_name last_name').exec()
    let expert = await Expert.find().select('_id job tags').exec()
    let jobs = [];
    expert.forEach(item=>{
      if(!jobs.includes(item.job)) jobs.push(item.job)
    })
    res.render('admin/experts/create', {errors: {}, data: {}, urlMediaUpload, user, expert, jobs})
  }

  const create = async (req, res) => {
    let data = {...req.body};
    let err = validateExpert(data);
    if (err && err.error) {
      let errors =
        err.error &&
        err.error.details.reduce((result, item) => {
          return {
            ...result,
            [item.path[0]]: item.message,
          };
        }, {});
        var user = await User.find().select('_id first_name last_name').exec()
      return res.render("admin/experts/create", { errors, data, user });
    } else {
      if(req.files.images){
        data.images = req.files.images[0]
      }
      let newExpert= new Expert(data);
      newExpert.save()
        .then((e) => {
          res.redirect("/admin/experts");
        })
        .catch((e) => {
          return res.render("admin/experts/create", {
            errors: {
              name: "The value is duplicated.",
              slug: "The value is duplicated.",
            },
            data,
          });
        });
    }
  };

  const getFormEdit = async (req, res) => {
    let id = req.params.id;
    let expert = await Expert.findById(id).exec()
    var user = await User.find().select('_id first_name last_name').exec()  
    let experts = await Expert.find().select('_id job tags').exec()
    let jobs = [];
    experts.forEach(item=>{
      if(!jobs.includes(item.job)) jobs.push(item.job)
    })
    res.render('admin/experts/edit', {errors: {}, data: expert, urlMediaUpload, user, experts, jobs })
  };
module.exports = {
    getListExpert,
    getFormCreate,
    create,
    getFormEdit

}
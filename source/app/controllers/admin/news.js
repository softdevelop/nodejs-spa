const mongoose = require("mongoose");
const New = mongoose.model("New");
const Spa = mongoose.model("Spa");
const Category = mongoose.model("Category");
const User = mongoose.model("User");
const moment = require("moment-timezone");
const {genHtmlPagination, urlMediaUpload,genCategory} = require('../../utils')
const {validateNew, validateNewEdit} = require('../../models/news')
const bcrypt = require("bcryptjs");

const APP_DOMAIN = require("../../../config/index").APP_DOMAIN;
const dashboardUrl = () => APP_DOMAIN + `/dashboard`;
mongoose.Promise = global.Promise;



const getListNew = async (req, res) => {
    if (req.user) {
      let { page, limit } = req.query;
      let search = req.query.search || '';
      let text = '.*'+search.split(' ').join('.*')+'.*'
      let reg = new RegExp(text);
      var query = {
        name: { $regex: reg, $options: 'gmi' },
        createBy: req.user.id
      };
      if(req.user.role == 'EDITOR')
        query.createBy= req.user.id
      var options = {
        select: "", //"username email"
        sort: { createdAt: -1 },
        lean: true,
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        populate: [{
          path: 'spas',
        },{
          path: 'user',
          select:'_id first_name last_name'
        },{
          path:'user_author',
          select:'_id first_name last_name'
        }
      ]
      };
      let data = await New.paginate(query, options);
      data.search = search
      return res.render("admin/news/index", {
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
    let today = new Date()
    var spas = await Spa.find().select('_id name').exec()
    let categories = await Category.getChildrenTree({
      fields: "_id name slug parent path",
      options: { lean: true },
    });
    let optionsHtml = genCategory.genMultiOptions(categories);
    let user = await User.find({role:'EXPERT'}).select().exec();
    res.render('admin/news/create', {errors: {}, data: {}, spas,user,urlMediaUpload, optionsHtml,today})
    
  }

  const create = async (req, res) => {
    let createBy = req.user.id
    let data = {...req.body,createBy};
    let err = validateNew(data);
    if (err && err.error) {
      let errors =
        err.error &&
        err.error.details.reduce((result, item) => {
          return {
            ...result,
            [item.path[0]]: item.message,
          };
        }, {});
      var spas = await Spa.find().select('_id name').exec()
      return res.render("admin/news/create", { errors, data, spas });
    } else {
      if(req.files.image){
        data.image = req.files.image[0]
      }
      let newNew = new New(data);
      newNew.save()
        .then((e) => {
          res.redirect("/admin/news");
        })
        .catch((e) => {
          return res.render("admin/news/create", {
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
    let news = await New.findById(id).exec()
    
    if(req.user.role == "EDITOR"){
      if(news.createBy != req.user.id){
        res.render('admin/404');
      }
    }

    let spas = await Spa.find().exec()
    let user = await User.find({role:'EXPERT'}).select(' _id first_name last_name').exec();
    let nameSpa = spas.find(item => item._id == news.spa_id)   
    let categories = await Category.getChildrenTree({
      fields: "_id name slug parent path",
      options: { lean: true },
    });
    let optionsHtml = genCategory.genMultiOptions(categories, '', news.category_ids);
    res.render('admin/news/edit', {errors: {}, data: news,user, urlMediaUpload, nameSpa, spas,optionsHtml })
  };

  const edit = async (req, res) => {
    let createBy = req.user.id
    let id = req.params.id

    let news = await New.findById(id).exec()
    
    if(req.user.role == "EDITOR"){
      if(news.createBy != req.user.id){
        res.render('admin/404');
      }
    }

    let data = {...req.body,createBy};
    delete data.image
    let err = validateNewEdit(data)
    if(err && err.error){
      let errors = err.error && err.error.details.reduce((result, item)=>{
        return {
          ...result,
          [item.path[0]]: item.message
        }
      }, {})
      data._id = id
      return res.render("admin/news/edit", { errors, data, urlMediaUpload });
    }else{
      if(req.files.image && req.files.image[0]){
        data.image = req.files.image[0]
      }else delete data.image
  
      await New.findById(id).update(data);
       res.redirect("/admin/news");
    }
  }

const delMany = async (req, res) => {
  try {
    let ids = req.body.ids;
    ids.map(async val => {
      const news = await New.deleteOne({ _id: val }, (err, result) => {
        if (err) return res.status(400).json({ status: "error" });
      }).exec();
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

const viewDetail = async (req, res) => {
  let id = req.params.id;
  let news = await New.findById(id).exec()
  let spas = await Spa.find().exec()
  let nameSpa = spas.find(item => item._id == news.spa_id)   
  let user = await User.find({role:'EXPERT'}).select(' _id first_name last_name').exec();
  let categories = await Category.getChildrenTree({
    fields: "_id name slug parent path",
    options: { lean: true },
  });
  let optionsHtml = genCategory.genMultiOptions(categories, '', news.category_ids);
  res.render('admin/news/view', {errors: {}, data: news,user, urlMediaUpload, nameSpa, spas,optionsHtml })
}

module.exports = {
getListNew,
getFormCreate,
create,
getFormEdit,
edit,
delMany,
viewDetail

}
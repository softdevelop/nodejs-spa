const mongoose = require("mongoose");
const {validateProduct, validateProductEdit} = require('../../models/products')
const Product = mongoose.model("Product");
const moment = require("moment-timezone");
const {genHtmlPagination, urlMediaUpload} = require('../../utils')
const bcrypt = require("bcryptjs");

const APP_DOMAIN = require("../../../config/index").APP_DOMAIN;
const dashboardUrl = () => APP_DOMAIN + `/dashboard`;
mongoose.Promise = global.Promise;

const getListProducts = async (req, res) => {
  console.log("aaa");
  
  let { page, limit } = req.query;
  var query = {
    // email: 'danh@gmail.com'
  };
  var options = {
    select: "", //"productname email"
    sort: { createdAt: -1 },
    lean: true,
    limit: parseInt(limit, 10) || 10,
    page: parseInt(page, 10) || 1
  };
  let data = await Product.paginate(query, options);
  console.log('urlMediaUpload', urlMediaUpload);
  // res.send(data)
  return res.render("admin/products/index", {
    data,
    urlMediaUpload,
    moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
    genHtmlPagination: genHtmlPagination(data.total, data.limit, data.page, data.pages),
  });
  
};

const getFormCreate = (req, res) => {
  res.render('admin/products/create', {errors: {}, data: {}})
}

const create = async (req, res) => {
  let data = req.body;
  console.log(data);
  let err = validateProduct(data)
  if(err && err.error){
    let errors = err.error && err.error.details.reduce((result, item)=>{
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    return res.render('admin/products/create', {errors, data})
  }else{
    if(req.files.avatar){
      data.avatar = req.files.avatar[0]
    }

    let newProduct = new Product(data)
    newProduct.save().then((e)=>{
      res.redirect('/admin/products')
    }).catch(e=>{
      console.log('catch', e);
    })
  }
}

const getFormEdit = async (req, res) => {
  let id = req.params.id
  let record = await Product.findById(id).exec();
  res.render('admin/products/edit', {errors: {}, data: record, urlMediaUpload})
}

// const edit = async (req, res) => {
//   let id = req.params.id
//   let data = req.body
//   let err = validateUserEdit(data)
//   if(err && err.error){
//     let errors = err.error && err.error.details.reduce((result, item)=>{
//       return {
//         ...result,
//         [item.path[0]]: item.message
//       }
//     }, {})
//     data._id = id
//     return res.render('admin/users/edit', {errors, data, urlMediaUpload})
//   }else{
//     if(req.files.avatar && req.files.avatar[0]){
//       data.avatar = req.files.avatar[0]
//     }else delete data.avatar

//     if(data.password && data.password == '') delete data.password
//     else data.password = bcrypt.hashSync(data.password, 10);
//     await User.findById(id).update(data);
//     res.redirect('/admin/users')
//   }
// }

module.exports = {
  getListProducts,
  getFormCreate,
  create,
  getFormEdit,
//   edit
};

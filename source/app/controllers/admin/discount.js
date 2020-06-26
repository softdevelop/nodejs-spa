const mongoose = require("mongoose");
const SpaService = mongoose.model("SpasService");
const Discount = mongoose.model("Discount");
const Spa = mongoose.model("Spa");
const moment = require("moment");
const {genHtmlPagination, urlMediaUpload} = require('../../utils');
const {validateDiscount,validateDiscountEdit} = require('../../models/discounts');
const { userService } = require("../../services");
const APP_DOMAIN = require("../../../config/index").APP_DOMAIN;
const dashboardUrl = () => APP_DOMAIN + `/dashboard`;
mongoose.Promise = global.Promise;


const getListDiscount = async (req, res) => {
    if (req.user) {
        let { page, limit } = req.query;
        let search = req.query.search || '';
        let text = '.*'+search.split(' ').join('.*')+'.*'
        let reg = new RegExp(text);
        var query = {
        //   title: { $regex: reg, $options: 'gmi' },
        };
        var options = {
          select: "", //"username email"
          sort: { createdAt: -1 },
          lean: true,
          limit: parseInt(limit, 10) || 10,
          page: parseInt(page, 10) || 1,
          populate: [{
            path: 'spaservice',
            populate: {
              path: 'service'
            }
          }],
        };

        let data = await Discount.paginate(query, options);
        data.search = search
        return res.render("admin/discount/index", {
          data,
          urlMediaUpload,
          moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
          genHtmlPagination: genHtmlPagination(data.total, data.limit, data.page, data.pages, data.search),
        });
      } else {
      }
};

const getFormEdit = async (req, res) => {
  
  let user_id = req.user._id
  let spa_id = await Spa.find({owner:user_id}).select("id").exec();
  let services = await SpaService.find({spa_id: spa_id}).populate({
    path: 'service',
    select: 'title'
  }).exec();
 
  let id = req.params.id;
  let discount = await Discount.findById(id).exec();
  res.render('admin/discount/edit', {
    errors: {},
    services,
    discount,
    moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
    urlMediaUpload,
  })
}

const edit = async (req, res) => {
  let id = req.params.id
  let data = req.body;
  let err = validateDiscountEdit(data)
  if(err && err.error){
    let errors = err.error && err.error.details.reduce((result, item)=>{
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    data._id = id
    let roles = await Role.find().select('name value').exec();
    let id = req.user._id
    let spa_id = await Spa.find({owner:id}).select("id").exec();
    let services = await SpaService.find({spa_id: spa_id}).populate('service').populate('spa').exec();
    return res.render('admin/discount/edit', {
      errors,
      data: {}, 
      services,
      moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
      servicesJSON: JSON.stringify(services).replace(/\\"/g, '\\\\"')
    })
    
  }else{
    if(req.files.image && req.files.image[0]){
      data.image = req.files.image[0]
    }else delete data.image

    
    await Discount.findById(id).update(data);
    res.redirect('/admin/spas/discount')
  }
}


const getFormCreate = async (req, res) => {
  
  let id = req.user._id
  let spa_id = await Spa.find({owner:id}).select("id").exec();
  let services = await SpaService.find({spa_id: spa_id}).populate('service').exec();
  res.render('admin/discount/create', {
    errors: {},
    services,
    moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
    servicesJSON: JSON.stringify(services).replace(/\\"/g, '\\\\"')
  })
}


const viewDetail = async (req, res) => {
  
  let id = req.params.id

  let data = await Discount.findById(id).populate({
    path: 'spaservice',
    select:'service service_id',
    populate: {
      path: 'service',
      select:'title',
      // match: {status: 'active'},
    }
  }).exec()
  res.render('admin/discount/view', {
    errors: {},
    data, 
    moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
    urlMediaUpload
  })
}

const create = async (req, res) => {
  let data = req.body
  if(data.spa_service_id==0) {
    delete data.spa_service_id;
    data.is_all_service = true;
  }
  data.status = 'pending';
  let err = validateDiscount(data)
  if(err && err.error){
    let errors = err.error && err.error.details.reduce((result, item)=>{
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    let id = req.user._id
    let spa_id = await Spa.find({owner:id}).select("id").exec();
    let services = await SpaService.find({spa_id: spa_id}).populate('service').populate('spa').exec();
    return res.render('admin/discount/create', {
      errors,
      data: {}, 
      services,
      moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
      servicesJSON: JSON.stringify(services).replace(/\\"/g, '\\\\"')
    })
  }else{

    if(req.files.image){
      data.image = req.files.image[0]
    }
    let newDiscount = new Discount(data)
    newDiscount.save().then((e)=>{
      res.redirect('/admin/spas/discount')
    }).catch(e=>{
      console.log('catch', e);
    })
  }
}




module.exports = {
  getListDiscount,
  getFormCreate,
  create,
  viewDetail,
  getFormEdit,
  edit

};

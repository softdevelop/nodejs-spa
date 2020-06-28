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
        let user_id = req.user._id
        let spa_id = await Spa.findOne({owner:user_id,status:"active"}).select("id").exec();
        let { page, limit } = req.query;
        let search = req.query.search || '';
        let text = '.*'+search.split(' ').join('.*')+'.*'
        let reg = new RegExp(text);
        var query = {
          title: { $regex: reg, $options: 'gmi' },
          spa_id : spa_id._id,
        };
        console.log(query);
        var options = {
          select: "", //"username email"
          sort: { createdAt: -1 },
          lean: true,
          limit: parseInt(limit, 10) || 10,
          page: parseInt(page, 10) || 1,
          populate: [{
            path: 'spaservice',
            populate: {
              path: 'service',
            }
          }],
        };
        let data = await Discount.paginate(query, options)

        data.search = search
        return res.render("admin/discount/index", {
          data,
          urlMediaUpload,
          moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
          genHtmlPagination: genHtmlPagination(data.total, data.limit, data.page, data.pages, data.search),
        });
      } else {
        res.render('admin/404')
      }
};

const getFormEdit = async (req, res) => {
  
  let user_id = req.user._id
  let spa_id = await Spa.findOne({owner:user_id,status:"active"}).select("_id").exec();
  let services = await SpaService.find({spa_id: spa_id}).populate({
    path: 'service',
    select: 'title'
  }).exec();
  console.log('===========spa_id================');
  console.log(spa_id);
  console.log('====================================');
 
  let id = req.params.id;
  let discount = await Discount.findById(id).exec();
  console.log('===========discount================');
  console.log(discount);
  console.log('====================================');
  if(spa_id.equals(discount.spa_id)){
    res.render('admin/discount/edit', {
      errors: {},
      services,
      discount,
      moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
      urlMediaUpload,
    })
  }else{
    res.render('admin/404')
  }
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
    let id = req.user._id
    let spa_id = await Spa.find({owner:id,status:"active"}).select("id").exec();
    let services = await SpaService.find({spa_id: spa_id}).populate('service').populate('spa').exec();
    return res.render('admin/discount/edit', {
      errors,
      data: {}, 
      services,
      moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
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
  let spa_id = await Spa.findOne({owner:id}).select("id").exec();
  let services = await SpaService.find({spa_id: spa_id.id}).populate('service').exec();
  res.render('admin/discount/create', {
    errors: {},
    services,
    moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
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
  let id = req.user._id
  let spa_id = await Spa.findOne({owner:id}).select("id").exec();
  let data = req.body
  data.spa_id = spa_id.id;
  if(data.spa_service_id==0) {
    delete data.spaspaservice
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
    let services = await SpaService.find({spa_id: spa_id.id}).populate('service').populate('spa').exec();
    return res.render('admin/discount/create', {
      errors,
      data: {}, 
      services,
      moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
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

delMany = async (req, res) => {
  try {
    let ids = req.body.ids;
    ids.map(async val => {
      const discount = await Discount.deleteOne({ _id: val }, (err, result) => {
        if (err) return res.status(400).json({ status: "error" });
      }).exec();
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};




module.exports = {
  getListDiscount,
  getFormCreate,
  create,
  viewDetail,
  getFormEdit,
  edit,
  delMany

};

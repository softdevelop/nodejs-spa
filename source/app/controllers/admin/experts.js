const mongoose = require("mongoose");
const Expert = mongoose.model("Expert");
const User = mongoose.model("User");
const ExpertService = mongoose.model("ExpertsService");
const moment = require("moment-timezone");
const {genHtmlPagination, urlMediaUpload, genCategory, constants} = require('../../utils')
const {validateExpert, validateExpertEdit} = require('../../models/experts')
const {validateExpertService,validateExpertServiceEdit} = require('../../models/experts_services')
const { 
  expertServiceService,
} = require("../../services");

const bcrypt = require("bcryptjs");
const { job } = require("cron");
const truncate = require('html-truncate');

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
        truncate,
        moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
        genHtmlPagination: genHtmlPagination(data.total, data.limit, data.page, data.pages, data.search),
      });
    } else {
      console.log('err', req.err);
    }
  };
  
  const getFormCreate = async (req, res) => {
    let usersOwnedExpert = await Expert.find({ user_id: { $ne: null } }).exec();
    let idsUsersOwnedExpert = usersOwnedExpert.map(item=>''+item.user_id);
    
    var user = await User.find({role: 'EXPERT', _id: { $nin: idsUsersOwnedExpert }}).select('_id first_name last_name').exec()
    let experts = await Expert.find().select('_id job tags').exec()
    let jobs = constants.jobs;
    let tags = constants.tags
    experts.forEach(item=>{
      if(!jobs.includes(item.job)) jobs.push(item.job)
      item.tags.forEach(tag=>{
        if(!tags.includes(tag)) tags.push(item.job)
      })
    })
    res.render('admin/experts/create', {
      errors: {}, 
      data: {}, 
      urlMediaUpload, 
      user, 
      jobs,
      tags
    })
  }

  const create = async (req, res) => {
    let data = {...req.body};
    let experts = await Expert.find().select('_id job tags').exec()
    let jobs = constants.jobs;
    let tags = constants.tags
    experts.forEach(item=>{
      if(!jobs.includes(item.job)) jobs.push(item.job)
      item.tags.forEach(tag=>{
        if(!tags.includes(tag)) tags.push(item.job)
      })
    })
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
      let usersOwnedExpert = await Expert.find({ user_id: { $ne: null } }).exec();
      let idsUsersOwnedExpert = usersOwnedExpert.map(item=>''+item.user_id);
      var user = await User.find({role: 'EXPERT', _id: { $nin: idsUsersOwnedExpert }}).select('_id first_name last_name').exec()
      return res.render("admin/experts/create", { 
        errors, 
        data, 
        user, 
        jobs,
        tags
      });
    } else {
      if(req.files.images){
        data.images = req.files.images
      }
      data.tags = data.tags.split(',')
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
            jobs,
            tags
          });
        });
    }
  };

  const getFormEdit = async (req, res) => {
    let id = req.params.id;
    let currentExpert = await Expert.findById(id).exec()
    
    let usersOwnedExpert = await Expert.find({ user_id: { $ne: null } }).exec();
    let idsUsersOwnedExpert = usersOwnedExpert.map(item=>''+item.user_id);
    idsUsersOwnedExpert = idsUsersOwnedExpert.filter(item=>currentExpert.user_id+'' != item)
    var user = await User.find({role: 'EXPERT', _id: { $nin: idsUsersOwnedExpert }}).select('_id first_name last_name').exec()   

    let experts = await Expert.find().select('_id job tags').exec()
    let jobs = constants.jobs;
    let tags = constants.tags
    experts.forEach(item=>{
      if(!jobs.includes(item.job)) jobs.push(item.job)
      item.tags.forEach(tag=>{
        if(!tags.includes(tag)) tags.push(item.job)
      })
    })
    res.render('admin/experts/edit', {
      errors: {}, 
      data: currentExpert, 
      urlMediaUpload, 
      user, 
      experts, 
      jobs,
      jobs,
      tags 
    })
  };


const edit = async (req, res) => {
  let id = req.params.id
  let data = req.body
  let currentExpert = await Expert.findById(id).exec();
  delete data.images
  if(req.files.images){
    data.images = req.files.images
  }else data.images = currentExpert.images;
 
  let err = validateExpertEdit(data)
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
    data.tags = data.tags.split(',')
    await Expert.findById(id).update(data);
    res.redirect("/admin/experts");

  }
}

const viewDetail = async (req, res) => {
  let id = req.params.id;
  let currentExpert = await Expert.findById(id).exec()
  let usersOwnedExpert = await Expert.find({ user_id: { $ne: null } }).exec();
  let idsUsersOwnedExpert = usersOwnedExpert.map(item=>''+item.user_id);
  idsUsersOwnedExpert = idsUsersOwnedExpert.filter(item=>currentExpert.user_id+'' != item)
  var user = await User.find({role: 'EXPERT', _id: { $nin: idsUsersOwnedExpert }}).select('_id first_name last_name').exec()   
  res.render('admin/experts/view', {
    errors: {}, 
    data: currentExpert, 
    urlMediaUpload, 
    user,
  })
}

const getListService = async (req, res) => {
  let id = req.params.id
  let record = await Expert.findById(id).exec();
  let data = await ExpertService.find({expert_id: id}).populate('service').exec();
  res.render('admin/experts/service/index', {errors: {}, data, record, urlMediaUpload})
}

const getFormCreateService = async (req, res) => {
  let id = req.params.id
  let record = await Expert.findById(id).exec();
  let spaOwners = await User.find({role: "SPA_OWNER"}).exec();
  res.render('admin/experts/service/create', {
    errors: {}, 
    data: {}, 
    record, 
    spaOwners, 
  })
}

const createService = async (req, res) => {
  let id = req.params.id
  let record = await Expert.findById(id).exec();
  let expert_id = record._id
  let data = {...req.body, expert_id};

  let err = validateExpertService(data);
    if (err && err.error) {
      let errors =
        err.error &&
        err.error.details.reduce((result, item) => {
          return {
            ...result,
            [item.path[0]]: item.message,
          };
        }, {});
      return res.render("admin/experts/service/create", { 
        errors,
        record, 
        data,
      });
    } else {
      try{
        if(req.files.image){
          data.image = req.files.image[0]
        }
      
        await expertServiceService.createExpertsService(data);
        res.redirect('/admin/experts/' +req.params.id+'/service/index');
      }catch(e){
        console.log('e', e);
      }
    }
  
};

const getFormEditService = async (req, res) => {
  let id = req.params.id
  let idExpertService = req.params.idExpertService
  let record = await Expert.findById(id).exec();
  let expertService = await ExpertService.findById(idExpertService).exec();
  res.render('admin/experts/service/edit', {
    errors: {}, 
    data: record,
    expertService, 
    urlMediaUpload, 
  })
}

const editService = async (req, res) => {
  let id = req.params.id
  let record = await Expert.findById(id).exec();
  let expert_id = record._id
  let idExpertService = req.params.idExpertService
  let expertService = await ExpertService.findById(idExpertService).exec();
  let data = {...req.body,expert_id}
  delete data.image

  let err = validateExpertServiceEdit(data)
  if(err && err.error){
    let errors = err.error && err.error.details.reduce((result, item)=>{
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    data._id = id
    return res.render('admin/experts/service/edit', {
      errors: {}, 
      data,
      record,
      expertService,
      urlMediaUpload,
    })
  }else{

    try{
      if(req.files.image){
        data.image = req.files.image[0]
      }
      await expertServiceService.editExpertsService(idExpertService, data);
      res.redirect('/admin/experts/' +req.params.id+'/service/index');
    }catch(e){
      console.log('e', e);
    }
  }
}

const delManyService = async (req, res) => {
  try {
    let ids = req.body.ids;
    ids.map(async val => {
      const user = await ExpertService.deleteOne({ _id: val }, (err, result) => {
        if (err) return res.status(400).json({ status: "error" });
      }).exec();
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
}

const viewDetailService = async (req, res) => {
  let id = req.params.id
  let record = await Expert.findById(id).exec();
  let idExpertService = req.params.idExpertService
  let expertService = await ExpertService.findById(idExpertService).populate('expert').exec();
  res.render('admin/experts/service/view', {errors: {}, data: record, expertService, urlMediaUpload})
}

module.exports = {
    getListExpert,
    getFormCreate,
    create,
    getFormEdit,
    edit,
    viewDetail,

    getListService,
    getFormCreateService,
    createService,
    viewDetailService,
    getFormEditService,
    editService,
    delManyService
}
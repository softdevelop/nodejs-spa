const mongoose = require("mongoose");
const Spa = mongoose.model("Spa");
const User = mongoose.model("User");
const SpaService = mongoose.model("SpasService")
const moment = require("moment-timezone");
const {genHtmlPagination, urlMediaUpload} = require('../../utils')
const {validateSpa, validateSpaEdit} = require('../../models/spas')
const {validateSpaService,validateSpaServiceEdit} = require('../../models/spas_services')
const bcrypt = require("bcryptjs");
var ObjectId = require('mongodb').ObjectID;
const {locations} = require("../../utils/constants");

const { 
  spaIntroService,
  spaServiceService,
  spaTeamService
} = require("../../services");

const APP_DOMAIN = require("../../../config/index").APP_DOMAIN;
const dashboardUrl = () => APP_DOMAIN + `/dashboard`;
mongoose.Promise = global.Promise;

const getListSpas = async (req, res) => {
  if (req.user) {
    let { page, limit } = req.query;
    let search = req.query.search || '';
    let text = '.*'+search.split(' ').join('.*')+'.*'
    let reg = new RegExp(text);
    var query = {
      name: { $regex: reg, $options: 'gmi' },
      description: { $regex: reg, $options: 'gmi' }
    };
    var options = {
      select: "", //"username email"
      sort: { createdAt: -1 },
      lean: true,
      limit: parseInt(limit, 10) || 10,
      page: parseInt(page, 10) || 1,
      populate: "ownerDetail",

    };
    let data = await Spa.paginate(query, options);
    data.search = search
    return res.render("admin/spas/index", {
      data,
      urlMediaUpload,
      moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
      genHtmlPagination: genHtmlPagination(data.total, data.limit, data.page, data.pages, data.search),
    });
  } else {
  }
};

const getFormCreate = async (req, res) => {
  let usersOwnedSpa = await Spa.find({ owner: { $ne: null } }).select('_id name owner').exec();
  let idsUsersOwnedSpa = usersOwnedSpa.map(item=>''+item.owner);
  let spaOwners = await User.find({role: "SPA_OWNER", _id: { $nin: idsUsersOwnedSpa }}).exec();
  res.render('admin/spas/create', {errors: {}, data: {}, spaOwners,locations})
}

const create = async (req, res) => {
  let data = req.body
  let err = validateSpa(data)
  if(err && err.error){
    let errors = err.error && err.error.details.reduce((result, item)=>{
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    return res.sendError({errors, data})
  }else{
    if(req.files.logo){
      data.logo = req.files.logo[0]
    }
    let newSpa = new Spa(data)
    newSpa.save().then((e)=>{
      return res.sendData({ status: 'Success'})
    }).catch(e=>{
      return res.sendError({errors: {name: 'The value is duplicated.', slug: 'The value is duplicated.'}})
    })
  }
}

const getFormEdit = async (req, res) => {
  let id = req.params.id
  let record = await Spa.findById(id).exec();
  let usersOwnedSpa = await Spa.find({ owner: { $ne: null } }).select('owner name').exec();
  let idsUsersOwnedSpa = [];
  usersOwnedSpa.forEach(item=>{
    if(''+item.owner === record.owner+''){
    }else{
      idsUsersOwnedSpa.push(''+item.owner)
    }
  });
  let spaOwners = await User.find({role: "SPA_OWNER", _id: { $nin: idsUsersOwnedSpa }}).exec();
  res.render('admin/spas/edit', {errors: {}, data: record, urlMediaUpload, spaOwners,locations})
}

const edit = async (req, res) => {
  let id = req.params.id
  let data = req.body
  delete data.logo
  let err = validateSpaEdit(data)
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
    if(req.files.logo && req.files.logo[0]){
      data.logo = req.files.logo[0]
    }else delete data.logo

    await Spa.findById(id).update(data);
    return res.sendData({ status: 'Success'})
  }
}

const delMany = async (req, res) => {
  try {
    let ids = req.body.ids;
    ids.map(async val => {
      const user = await Spa.deleteOne({ _id: val }, (err, result) => {
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
  let record = await Spa.findById(id).exec();
  let usersOwnedSpa = await Spa.find({ owner: { $ne: null } }).select('_id name').exec();
  let idsUsersOwnedSpa = usersOwnedSpa.map(item=>''+item._id);
  let spaOwners = await User.find({role: "SPA_OWNER", _id: { $nin: idsUsersOwnedSpa }}).exec();
  res.render('admin/spas/view', {errors: {}, data: record, urlMediaUpload, spaOwners})
}

const landingPage = async (req, res) => {
  try{
    let user = await User.findById(req.user._id).populate('spa').exec();
    let spa = user.spa;
    let spaLandingData = await Spa.findById(spa._id).populate('intros').populate('services').populate('members').exec();
    res.render('admin/spas/landing-page', {
      spaLandingData, 
      urlMediaUpload,
      spaLandingDataJSON: JSON.stringify(spaLandingData).replace(/\\"/g, '\\\\"'),
    })
  } catch(e){
    res.render('admin/404_user_not_owner_spa')
  }
}

const setTemplate = async (req, res) => {
  let user = await User.findById(req.user._id).populate('spa').exec();
  let spa = user.spa;
  let data = req.body
  let files = req.files;
  let fileObj = await files.reduce((result, item)=>{
    return {
      ...result,
      [item.fieldname]: item
    }
  }, {})

  await data.intros.forEach(async item=>{
    if(item.id){
      item.image = fileObj[item.id];
      if(!item.image) delete item.image
      await spaIntroService.editSpasIntro(item.id, item)
    }else{
      item.spa_id = spa._id
      item.image = fileObj[item.image]
      await spaIntroService.createSpasIntro(item);
    }
  })

  await data.services.forEach(async item=>{
    if(item.id){
      item.image = fileObj[item.id];
      if(!item.image) delete item.image
      await spaServiceService.editSpasService(item.id, item)
    }else{
      item.spa_id = spa._id
      item.image = fileObj[item.image]
      await spaServiceService.createSpasService(item);
    }
  })

  await data.members.forEach(async item=>{
    if(item.id){
      item.avatar = fileObj[item.id];
      if(!item.avatar) delete item.avatar
      await spaTeamService.editSpasTeam(item.id, item)
    }else{
      item.spa_id = spa._id
      item.avatar = fileObj[item.avatar]
      await spaTeamService.createSpasTeam(item);
    }
  })

  await Spa.findById(spa._id).updateOne({
    working_hour: data.workingHour,
    template_id: data.templateId,
    description: data.description
  })

  res.sendData('Success')

}

const getTemplatePreview = async (req, res) => {
  let user = await User.findById(req.user._id).populate('spa').exec();
  let spa = user.spa;
  let spaDetail = await Spa.findById(spa._id).populate('intros').populate('services').populate('members').exec();
  let template_id = spaDetail.template_id;
  res.render("template/"+template_id, {
    spaDetail,
    urlMediaUpload
  });
}

const getTemplateId = async (req, res) => {
  let user = await User.findById(req.user._id).populate('spa').exec();
  let spa = user.spa;
  let spaDetail = await Spa.findById(spa._id).populate('intros').populate('services').populate('members').exec();
  let template_id = spaDetail.template_id;
  res.render('template/'+req.params.id, {
    spaDetail,
    urlMediaUpload
  })
}

const getTemplateExampleId = async (req, res) => {
  res.render('template/'+req.params.id+'_example')
}

const getFormService = async (req, res) => {
  let id = req.params.id
  let record = await Spa.findById(id).exec();
  let spaOwners = await User.find({role: "SPA_OWNER"}).exec();
  let spaLandingData = await Spa.findById(record._id).populate('services').exec();
  res.render('admin/spas/service/index', {errors: {}, data: spaLandingData.services,record, urlMediaUpload, spaOwners})
}
const getFormCreateService = async (req, res) => {
  let id = req.params.id
  let record = await Spa.findById(id).exec();
  
  let spaOwners = await User.find({role: "SPA_OWNER"}).exec();
  res.render('admin/spas/service/create', {errors: {}, data: {},record, spaOwners})
}
const createService = async (req, res) => {
  let id = req.params.id
  let record = await Spa.findById(id).exec();
  let spa_id = record._id
  let data = {...req.body,spa_id};
  // delete data.image;
  let err = validateSpaService(data);
  
  if (err && err.error) {
    let errors =
      err.error &&
      err.error.details.reduce((result, item) => {
        return {
          ...result,
          [item.path[0]]: item.message,
        };
      }, {});
    return res.render("admin/spas/service/create", { errors,record, data });
  } else {
    if(req.files.image){
      data.image = req.files.image[0]
    }
    let newSpaService = new SpaService(data);
    newSpaService
      .save()
      .then((data) => {
        res.redirect('/admin/spas/' +req.params.id+'/service/index');
       
      })
      .catch((err) => {
        return res.render("admin/spas/service/create", {
          errors: {
            name: "The value is duplicated.",
            slug: "The value is duplicated.",
          },
          data,record,
        });
      });
  }
};

const getFormEditService = async (req, res) => {
  let id = req.params.id
  let idService = req.params.idService
  let record = await Spa.findById(id).exec();
  let resole = await SpaService.findById(idService).exec();
  let spaOwners = await User.find({role: "SPA_OWNER"}).exec();
  res.render('admin/spas/service/edit', {errors: {}, data: record,resole, urlMediaUpload, spaOwners})
}
const editService = async (req, res) => {
  let id = req.params.id
  let record = await Spa.findById(id).exec();
  let spa_id = record._id
  let idService = req.params.idService
  let resole = await SpaService.findById(idService).exec();
  let data = {...req.body,spa_id}
  delete data.image
  let err = validateSpaServiceEdit(data)
  if(err && err.error){
    let errors = err.error && err.error.details.reduce((result, item)=>{
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    data._id = id
    return res.render('admin/spas/service/edit', {errors: {}, data,record,resole,urlMediaUpload})
  }else{
    if(req.files.image && req.files.image[0]){
      data.image = req.files.image[0]
    }else delete data.image

    await SpaService.findById(idService).update(data);
    return res.redirect('/admin/spas/' +req.params.id+'/service/index')
  }
}
const delManyService = async (req, res) => {
  try {
    let ids = req.body.ids;
    ids.map(async val => {
      const user = await SpaService.deleteOne({ _id: val }, (err, result) => {
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
  let record = await Spa.findById(id).exec();
  let idService = req.params.idService
  let resole = await SpaService.findById(idService).exec();
  res.render('admin/spas/service/view', {errors: {}, data: record,resole, urlMediaUpload})
}

module.exports = {
  getListSpas,
  getFormCreate,
  create,
  getFormEdit,
  edit,
  delMany,
  viewDetail,
  landingPage,
  setTemplate,
  getTemplatePreview,
  getTemplateId,
  getTemplateExampleId,
  getFormCreateService,
  createService,
  getFormService,
  getFormEditService,
  editService,
  delManyService,
  viewDetailService
};

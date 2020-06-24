const mongoose = require("mongoose");
const SpaService = mongoose.model("SpasService");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const {genHtmlPagination, urlMediaUpload} = require('../../utils');
const {validateResetPass,validateUser, validateUserProfileEdit} = require('../../models/users');
const { userService } = require("../../services");

const APP_DOMAIN = require("../../../config/index").APP_DOMAIN;
const dashboardUrl = () => APP_DOMAIN + `/dashboard`;
mongoose.Promise = global.Promise;

const viewOffer = async (req, res) => {
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
        };
        let a = await SpaService.find().exec();
        console.log('============11111111111===============');
        console.log(a.length);
        console.log('==========1111111111============');

        let data = await SpaService.paginate(query, options);
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        data.search = search
        return res.render("admin/offer/index", {
          data,
          urlMediaUpload,
          moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
          genHtmlPagination: genHtmlPagination(data.total, data.limit, data.page, data.pages, data.search),
        });
      } else {
      }
};



module.exports = {
  viewOffer,
};

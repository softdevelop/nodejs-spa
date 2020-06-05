const mongoose = require("mongoose");
const Staticpage = mongoose.model("Staticpage");
const moment = require("moment-timezone");
const { genHtmlPagination, urlMediaUpload } = require("../../utils");
const {
  validateStaticpage,
  validateStaticpageEdit,
} = require("../../models/staticpages");

mongoose.Promise = global.Promise;

const getListStaticpages = async (req, res) => {
  let { page, limit } = req.query;
  let search = req.query.search || "";
  let text = ".*" + search.split(" ").join(".*") + ".*";
  let reg = new RegExp(text);
  var query = {
    name: { $regex: reg, $options: "gmi" },
    slug: { $regex: reg, $options: "gmi" },
  };
  var options = {
    select: "", //"username email"
    sort: { createdAt: -1 },
    lean: true,
    limit: parseInt(limit, 10) || 10,
    page: parseInt(page, 10) || 1,
  };
  let data = await Staticpage.paginate(query, options);
  data.search = search;
  return res.render("admin/staticpages/index", {
    data,
    urlMediaUpload,
    moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
    genHtmlPagination: genHtmlPagination(
      data.total,
      data.limit,
      data.page,
      data.pages,
      data.search
    ),
  });
};

const getFormCreate = async (req, res) => {
  res.render("admin/staticpages/create", { errors: {}, data: {} });
};

const create = async (req, res) => {
  let data = req.body;
  delete data.files;
  let err = validateStaticpage(data);
  if (err && err.error) {
    let errors =
      err.error &&
      err.error.details.reduce((result, item) => {
        return {
          ...result,
          [item.path[0]]: item.message,
        };
      }, {});
    return res.render("admin/staticpages/create", { errors, data });
  } else {
    let newStaticpage = new Staticpage(data);
    newStaticpage
      .save()
      .then((e) => {
        res.redirect("/admin/static-pages");
      })
      .catch((e) => {
        return res.render("admin/staticpages/create", {
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
  let slug = req.params.slug;
  let record = await Staticpage.findOne({ slug }).exec();
  res.render("admin/staticpages/edit", {
    errors: {},
    data: record,
    urlMediaUpload,
  });
};

const edit = async (req, res) => {
  let slug = req.params.slug;
  let data = req.body;
  delete data.files;
  let err = validateStaticpageEdit(data);
  if (err && err.error) {
    let errors =
      err.error &&
      err.error.details.reduce((result, item) => {
        return {
          ...result,
          [item.path[0]]: item.message,
        };
      }, {});
    return res.render("admin/staticpages/edit", {
      errors,
      data,
      urlMediaUpload,
    });
  } else {
    await Staticpage.findOne({ slug }).update(data);
    res.redirect("/admin/static-pages");
  }
};

delMany = async (req, res) => {
  try {
    let ids = req.body.ids;
    ids.map(async (val) => {
      const user = await Staticpage.deleteOne({ _id: val }, (err, result) => {
        if (err) return res.status(400).json({ status: "error" });
      }).exec();
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

const viewDetail = async (req, res) => {
  let slug = req.params.slug;
  let record = await Staticpage.findOne({ slug }).exec();
  res.render("admin/staticpages/view", {
    errors: {},
    data: record,
    urlMediaUpload,
  });
};

module.exports = {
  getListStaticpages,
  getFormCreate,
  create,
  getFormEdit,
  edit,
  delMany,
  viewDetail,
};

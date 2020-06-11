const mongoose = require("mongoose");
const Qa = mongoose.model("Qa");
const moment = require("moment-timezone");
const { genHtmlPagination, urlMediaUpload } = require("../../utils");
const { validateQA, validateQAEdit } = require("../../models/qas");

mongoose.Promise = global.Promise;

const getListQas = async (req, res) => {
  let { page, limit } = req.query;
  let search = req.query.search || "";
  let text = ".*" + search.split(" ").join(".*") + ".*";
  let reg = new RegExp(text);
  var query = {
    question: { $regex: reg, $options: "gmi" },
    answer: { $regex: reg, $options: "gmi" },
  };
  var options = {
    select: "", //"username email"
    sort: { createdAt: -1 },
    lean: true,
    limit: parseInt(limit, 10) || 10,
    page: parseInt(page, 10) || 1,
  };
  let data = await Qa.paginate(query, options);
  data.search = search;
  return res.render("admin/qas/index", {
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
  res.render("admin/qas/create", { errors: {}, data: {} });
};

const create = async (req, res) => {
  let data = req.body;
  delete data.files;
  let err = validateQA(data);
  if (err && err.error) {
    let errors =
      err.error &&
      err.error.details.reduce((result, item) => {
        return {
          ...result,
          [item.path[0]]: item.message,
        };
      }, {});
    return res.render("admin/qas/create", { errors, data });
  } else {
    let newQa = new Qa(data);
    newQa
      .save()
      .then((e) => {
        res.redirect("/admin/q-a");
      })
      .catch((e) => {
        return res.render("admin/qas/create", {
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
  let record = await Qa.findOne({ slug }).exec();
  res.render("admin/qas/edit", {
    errors: {},
    data: record,
    urlMediaUpload,
  });
};

const edit = async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  delete data.files;
  let err = validateQAEdit(data);
  if (err && err.error) {
    let errors =
      err.error &&
      err.error.details.reduce((result, item) => {
        return {
          ...result,
          [item.path[0]]: item.message,
        };
      }, {});
    return res.render("admin/qas/edit", { errors, data, urlMediaUpload });
  } else {
    await Qa.findById(id).update(data);
    res.redirect("/admin/q-a");
  }
};

delMany = async (req, res) => {
  try {
    let ids = req.body.ids;
    ids.map(async (val) => {
      const user = await Qa.deleteOne({ _id: val }, (err, result) => {
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
  let record = await Qa.findOne({ slug }).exec();
  res.render("admin/qas/view", {
    errors: {},
    data: record,
    urlMediaUpload,
  });
};

module.exports = {
  getListQas,
  getFormCreate,
  create,
  getFormEdit,
  edit,
  delMany,
  viewDetail,
};

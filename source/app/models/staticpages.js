const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const Joi = require('joi');

const STATUS = ["blocked", "active", "pending"];

const StaticpageSchema = new Schema({
    name: { type: String, unique: true, required: true },
    slug: { type: String, unique: true, required: true },
    content: { type: String, required: true },
    status: { type: String, enum: STATUS, default: STATUS[2] }
  }, {
    timestamps: true,
})


function validateStaticpage(staticpage) {
  const schema = {
      name: Joi.string().min(1).max(50).required(),
      slug: Joi.string().min(1).max(50).required(),
      content: Joi.string().min(5).required(),
      status: Joi.string().required()
  };
  return Joi.validate(staticpage, schema, { abortEarly: false });
}

function validateStaticpageEdit(staticpage) {
  const schema = {
    name: Joi.string().min(1).max(50).required(),
    slug: Joi.string().min(1).max(50).required(),
    content: Joi.string().min(5).required(),
    status: Joi.string().required()
  };
  return Joi.validate(staticpage, schema, { abortEarly: false });
}

/**
 * virtual
 */
StaticpageSchema.virtual('created_at').get(function () {
    return moment(this.createdAt).format("DD-MM-YYYY hh:mm:ss");
})

StaticpageSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error({name: 'This field is duplicated'}));
    else next(error);
});

const genStaticpages = () => {
    return [...Array(100).keys()].map(item => {
        return ({
          name: `staticpage_${item}`,
          slug: `staticpage_${item}`,
          content: `staticpage_${item}`,
          status: STATUS[2]
        })
    })
}
const dataMigrate = [
    ...genStaticpages()
];

StaticpageSchema.statics.getMigrateData = function () {
    return dataMigrate;
}

StaticpageSchema.set('toObject', { virtuals: true });
StaticpageSchema.set('toJSON', { virtuals: true });
StaticpageSchema.plugin(mongoosePaginate);
const Staticpage = mongoose.model('Staticpage', StaticpageSchema);

exports.Staticpage = Staticpage;
exports.validateStaticpage = validateStaticpage;
exports.validateStaticpageEdit = validateStaticpageEdit;
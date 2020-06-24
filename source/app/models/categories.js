const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");
const MpathPlugin = require('mongoose-mpath');

const Schema = mongoose.Schema;
const Joi = require('joi');

const STATUS = ["blocked", "active", "pending"];

const CategorySchema = new Schema({
    name: { type: String, require: true },
    slug: { type: String, unique: true, require: true },
    status: { type: String, enum: STATUS, default: STATUS[2] },
    parent: { type: String, default: '' },
}, {
    timestamps: true
}
)
function validateCategory(category) {
    const schema = {
        name: Joi.string().min(1).max(50).required(),
        slug: Joi.string().min(1).max(50).required(),
        status: Joi.string().valid(STATUS).required(),
        parent: Joi.string().allow('')
    }
    return Joi.validate(category, schema, { abortEarly: false });
}

function validateCategoryEdit(category) {
    const schema = {
      name: Joi.string().min(1).max(50).required(),
      slug: Joi.string().min(1).max(50).required(),
      status: Joi.string().valid(STATUS).required(),
      parent: Joi.string().allow('')
    }
    return Joi.validate(category, schema, { abortEarly: false });
}

CategorySchema.virtual('created_at').get(function () {
    return moment(this.createdAt).format("DD-MM-YYYY hh:mm:ss");
})

CategorySchema.virtual('updated_at').get(function () {
    return moment(this.updatedAt).format("DD-MM-YYYY hh:mm:ss");
})

CategorySchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('Slug already exists, please try again'));
    else next(error);
});

const genCategories = () => {
  return [...Array(5).keys()].map(item => {
      return ({
          name: `Category ${item}`,
          slug: `LCategory ${item}`,
          status: STATUS[2],
      })
  })
}
const dataMigrate = [
  // ...genCategories()
];

CategorySchema.statics.getMigrateData = function () {
    return dataMigrate;
}

CategorySchema.set('toObject', { virtuals: true });
CategorySchema.set('toJSON', { virtuals: true });
CategorySchema.plugin(mongoosePaginate);
CategorySchema.plugin(MpathPlugin, {
  pathSeparator: '#',              // String used to separate ids in path
  onDelete:      'REPARENT',       // 'REPARENT' or 'DELETE'
  idType:        Schema.ObjectId   // Type used for model id
});

const Category = mongoose.model('Category', CategorySchema);

exports.validateCategory = validateCategory;
exports.validateCategoryEdit = validateCategoryEdit;
exports.Category = Category;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const Joi = require('joi');

const STATUS = ["blocked", "active", "pending"];

const DiscountSchema = new Schema({
    title: { type: String, required: false },
    content: { type: String, required: false },
    image: { type: Object, required: false },
    price: { type: Number, required: false },
    status: { type: String, enum: STATUS, default: STATUS[2] },
    date_start: { type: Date },
    date_end: { type: Date },
    spa_service_id: { type: Schema.Types.ObjectId, required: false },
    spa_id: { type: Schema.Types.ObjectId, required: false },
    is_all_service: {type:Boolean,default: false, required: false}
  }, {
    timestamps: true,
})


function validateDiscount(data) {
  const schema = {
      title: Joi.string().max(50).required(),
      content: Joi.string().max(500).required(),
      image: Joi.object(),
      status: Joi.string().valid(STATUS).required(),
      date_start: Joi.date().required(),
      date_end: Joi.date().required(),
      price: Joi.number().required(),
      spa_service_id: Joi.any(),
      spa_id: Joi.any(),
      is_all_service: Joi.boolean()
  };
  return Joi.validate(data, schema, { abortEarly: false });
}

function validateDiscountEdit(data) {
  const schema = {
    title: Joi.string().max(50).required(),
    content: Joi.string().max(1000).required(),
    image: Joi.object(),
    date_start: Joi.date().required(),
    date_end: Joi.date().required(),
    price: Joi.number().required(),
    spa_service_id: Joi.any(),
    spa_id: Joi.any(),
    is_all_service: Joi.boolean()
  };
  return Joi.validate(data, schema, { abortEarly: false });
}

/**
 * virtual
 */

DiscountSchema.virtual('spaservice', {
  ref: 'SpasService',
  localField: 'spa_service_id',
  foreignField: '_id',
  justOne: true
});

DiscountSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error({name: 'This field is duplicated'}));
    else next(error);
});

DiscountSchema.statics.getMigrateData = function () {
    return [];
}

DiscountSchema.set('toObject', { virtuals: true });
DiscountSchema.set('toJSON', { virtuals: true });
DiscountSchema.plugin(mongoosePaginate);
const Discount = mongoose.model('Discount', DiscountSchema);

exports.Discount = Discount;
exports.validateDiscount = validateDiscount;
exports.validateDiscountEdit = validateDiscountEdit;
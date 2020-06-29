const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const Joi = require('joi');

const STATUS = ["blocked", "active", "pending"];

const ExpertServiceSchema = new Schema({
    title: { type: String, required: false },
    content: { type: String, required: false },
    image: { type: Object, required: false },
    price: { type: Number, required: false },
    expert_id: { type: Schema.Types.ObjectId, required: true },
  }, {
    timestamps: true,
})

function validateExpertService(data) {
  const schema = {
      title: Joi.string().max(50).required(),
      content: Joi.string().max(500).required(),
      image: Joi.object(),
      price: Joi.number().required(),
      expert_id: Joi.required()
  };
  return Joi.validate(data, schema, { abortEarly: false });
}

function validateExpertServiceEdit(data) {
  const schema = {
    title: Joi.string().max(50).required(),
    content: Joi.string().max(500).required(),
    image: Joi.object(),
    price: Joi.number().required(),
    expert_id: Joi.required()
  };
  return Joi.validate(data, schema, { abortEarly: false });
}

/**
 * virtual
 */

ExpertServiceSchema.virtual('service', {
  ref: 'Service',
  localField: 'service_id',
  foreignField: '_id',
  justOne: true
});

ExpertServiceSchema.virtual('expert', {
  ref: 'Expert',
  localField: 'expert_id',
  foreignField: '_id',
  justOne: true
});

ExpertServiceSchema.virtual('created_at').get(function () {
    return moment(this.createdAt).format("DD-MM-YYYY hh:mm:ss");
})

ExpertServiceSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error({name: 'This field is duplicated'}));
    else next(error);
});

ExpertServiceSchema.statics.getMigrateData = function () {
    return [];
}

ExpertServiceSchema.set('toObject', { virtuals: true });
ExpertServiceSchema.set('toJSON', { virtuals: true });
ExpertServiceSchema.plugin(mongoosePaginate);
const ExpertService = mongoose.model('ExpertsService', ExpertServiceSchema);

exports.ExpertService = ExpertService;
exports.validateExpertService = validateExpertService;
exports.validateExpertServiceEdit = validateExpertServiceEdit;
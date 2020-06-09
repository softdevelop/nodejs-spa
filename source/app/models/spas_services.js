const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const Joi = require('joi');

const STATUS = ["blocked", "active", "pending"];

const SpaServiceSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: Object, required: true },
    price: { type: Number, required: true },
    spa_id: { type: Schema.Types.ObjectId, required: true }
  }, {
    timestamps: true,
})


function validateSpaService(data) {
  const schema = {
      tile: Joi.string().max(50).required(),
      content: Joi.string().max(500).required(),
      image: Joi.object().required(),
      price: Joi.number().required(),
      spa_id: Joi.string().required()
  };
  return Joi.validate(data, schema, { abortEarly: false });
}

function validateSpaServiceEdit(data) {
  const schema = {
    tile: Joi.string().max(50).required(),
    content: Joi.string().max(500).required(),
    image: Joi.object().required(),
    price: Joi.number().required(),
    spa_id: Joi.string().required()
  };
  return Joi.validate(data, schema, { abortEarly: false });
}

/**
 * virtual
 */
SpaServiceSchema.virtual('created_at').get(function () {
    return moment(this.createdAt).format("DD-MM-YYYY hh:mm:ss");
})

SpaServiceSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error({name: 'This field is duplicated'}));
    else next(error);
});

SpaServiceSchema.statics.getMigrateData = function () {
    return [];
}

SpaServiceSchema.set('toObject', { virtuals: true });
SpaServiceSchema.set('toJSON', { virtuals: true });
SpaServiceSchema.plugin(mongoosePaginate);
const SpaService = mongoose.model('SpasService', SpaServiceSchema);

exports.SpaService = SpaService;
exports.validateSpaService = validateSpaService;
exports.validateSpaServiceEdit = validateSpaServiceEdit;
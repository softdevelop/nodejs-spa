const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const Joi = require('joi');

const STATUS = ["blocked", "active", "pending"];

const SpaIntroSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: Object, required: true },
    spa_id: { type: Schema.Types.ObjectId, required: true }
  }, {
    timestamps: true,
})


function validateSpaIntro(data) {
  const schema = {
      tile: Joi.string().max(50).required(),
      content: Joi.string().max(500).required(),
      image: Joi.object().required(),
      spa_id: Joi.string().required()
  };
  return Joi.validate(data, schema, { abortEarly: false });
}

function validateSpaIntroEdit(data) {
  const schema = {
    tile: Joi.string().max(50).required(),
    content: Joi.string().max(500).required(),
    image: Joi.object().required(),
    spa_id: Joi.string().required()
  };
  return Joi.validate(data, schema, { abortEarly: false });
}

/**
 * virtual
 */
SpaIntroSchema.virtual('created_at').get(function () {
    return moment(this.createdAt).format("DD-MM-YYYY hh:mm:ss");
})

SpaIntroSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error({name: 'This field is duplicated'}));
    else next(error);
});

SpaIntroSchema.statics.getMigrateData = function () {
    return [];
}

SpaIntroSchema.set('toObject', { virtuals: true });
SpaIntroSchema.set('toJSON', { virtuals: true });
SpaIntroSchema.plugin(mongoosePaginate);
const SpaIntro = mongoose.model('SpasIntro', SpaIntroSchema);

exports.SpaIntro = SpaIntro;
exports.validateSpaIntro = validateSpaIntro;
exports.validateSpaIntroEdit = validateSpaIntroEdit;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const Joi = require('joi');

const STATUS = ["blocked", "active", "pending"];

const SpaTeamSchema = new Schema({
    name: { type: String, required: true },
    avatar: { type: Object, required: true },
    content: { type: String, required: true },
    spa_id: { type: Schema.Types.ObjectId, required: true }
  }, {
    timestamps: true,
})

function validateSpaTeam(data) {
  const schema = {
      name: Joi.string().max(50).required(),
      avatar: Joi.object().required(),
      content: Joi.string().required(),
      spa_id: Joi.string().required()
  };
  return Joi.validate(data, schema, { abortEarly: false });
}

function validateSpaTeamEdit(data) {
  const schema = {
    name: Joi.string().max(50).required(),
    avatar: Joi.object().required(),
    content: Joi.string().required(),
    spa_id: Joi.string().required()
  };
  return Joi.validate(data, schema, { abortEarly: false });
}

/**
 * virtual
 */
SpaTeamSchema.virtual('created_at').get(function () {
    return moment(this.createdAt).format("DD-MM-YYYY hh:mm:ss");
})

SpaTeamSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error({name: 'This field is duplicated'}));
    else next(error);
});

SpaTeamSchema.statics.getMigrateData = function () {
    return [];
}

SpaTeamSchema.set('toObject', { virtuals: true });
SpaTeamSchema.set('toJSON', { virtuals: true });
SpaTeamSchema.plugin(mongoosePaginate);
const SpaTeam = mongoose.model('SpasTeam', SpaTeamSchema);

exports.SpaTeam = SpaTeam;
exports.validateSpaTeam = validateSpaTeam;
exports.validateSpaTeamEdit = validateSpaTeamEdit;
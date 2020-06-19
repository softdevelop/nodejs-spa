const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const Joi = require('joi');

const STATUS = ["blocked", "active", "pending"];

const SpaSchema = new Schema({
    name: { type: String, unique: true, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    latitude: { type: String, required: true, required: true },
    longitude: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String },
    status: { type: String, enum: STATUS, default: STATUS[2] },
    location:{type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    note: { type: String, default: '' },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    imgs: { type: Object},
    logo: { type: Object },
    working_hour: {
      start: { type: String },
      end: { type: String }
    },
    template_id: { type: String, default: null}
  }, {
    timestamps: true,
})


function validateSpa(spa) {
  const schema = {
      name: Joi.string().min(1).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      slug: Joi.string().min(1).max(50).required(),
      description: Joi.string().min(1).required(),
      latitude: Joi.string().min(5).max(255).required(),
      longitude: Joi.string().min(5).max(255).required(),
      address: Joi.string(),
      location: Joi.string().required(),
      phone: Joi.string().required(),
      status: Joi.string().required(),
      note: Joi.string().allow(''),
      owner: Joi.string().required()
  };
  return Joi.validate(spa, schema, { abortEarly: false });
}

function validateSpaEdit(spa) {
  const schema = {
      name: Joi.string().min(1).max(50).required(),
      slug: Joi.string().min(1).max(50).required(),
      description: Joi.string().min(5).required(),
      latitude: Joi.string().min(5).max(255).required(),
      longitude: Joi.string().min(5).max(255).required(),
      email: Joi.string().min(5).max(255).required().email(),
      location: Joi.string().required(),
      address: Joi.string(),
      phone: Joi.string().required(),
      status: Joi.string().required(),
      note: Joi.string().allow(''),
      owner: Joi.string().required()
  };
  return Joi.validate(spa, schema, { abortEarly: false });
}

/**
 * virtual
 */
SpaSchema.virtual('ownerDetail', {
  ref: 'User',
  localField: 'owner',
  foreignField: '_id',
  justOne: true
});

SpaSchema.virtual('intros', {
  ref: 'SpasIntro',
  localField: '_id',
  foreignField: 'spa_id',
});

SpaSchema.virtual('services', {
  ref: 'SpasService',
  localField: '_id',
  foreignField: 'spa_id',
});

SpaSchema.virtual('members', {
  ref: 'SpasTeam',
  localField: '_id',
  foreignField: 'spa_id',
});

SpaSchema.virtual('created_at').get(function () {
    return moment(this.createdAt).format("DD-MM-YYYY hh:mm:ss");
})

SpaSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error({name: 'This field is duplicated'}));
    else next(error);
});

const genSpas = () => {
    return [...Array(100).keys()].map(item => {
        return ({
          name: `spa_${item}`,
          slug: `spa_${item}`,
          description: `spa_${item}`,
          longitude : "108.10752868652345",
          latitude : "16.087217525416673",
          address: `spa_${item}`,
          phone: `spa_${item}`,
          status: STATUS[2],
          note: `spa_${item}`,
          owners: []
        })
    })
}
const dataMigrate = [
    ...genSpas()
];

SpaSchema.statics.getMigrateData = function () {
    return dataMigrate;
}

SpaSchema.set('toObject', { virtuals: true });
SpaSchema.set('toJSON', { virtuals: true });
SpaSchema.plugin(mongoosePaginate);
const Spa = mongoose.model('Spa', SpaSchema);

exports.Spa = Spa;
exports.validateSpa = validateSpa;
exports.validateSpaEdit = validateSpaEdit;
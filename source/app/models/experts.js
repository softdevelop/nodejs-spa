const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const Joi = require('joi');

const ExpertSchema = new Schema({
    slug: {type: String, unique: true, required: true },
    about: {type: String, required: true },
    slogan: {type: String, required: false },
    images: {type: [{ type: Object}], default: []},
    description: { type: String },
    user_id: {type: Schema.Types.ObjectId, ref: 'User' },
    tags: {type: Array, require: false},
    job: {type: String, required: false }

},{
    timestamps: true,
})

function validateExpert(expert){
    const schema ={
        slug: Joi.string().min(1).required(),
        about: Joi.string().min(1).required(),
        slogan: Joi.string().min(1),
        images: Joi.array(),
        description: Joi.string().min(1),
        user_id: Joi.string().required(),
        tags: Joi.allow(),
        job: Joi.string().min(1)
    }
    return Joi.validate(expert, schema, { abortEarly: false });
}

function validateExpertEdit(expert){
    const schema ={
        slug: Joi.string().min(1).required(),
        about: Joi.string().min(1).required(),
        slogan: Joi.string().min(1),
        images: Joi.array().required(),
        description: Joi.string().min(1),
        user_id: Joi.string().required(),
        tags: Joi.allow(),
        job: Joi.string().min(1)
    }
    return Joi.validate(expert, schema, { abortEarly: false });
}

ExpertSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true
});  

ExpertSchema.virtual('services', {
  ref: 'ExpertsService',
  localField: '_id',
  foreignField: 'expert_id',
})

ExpertSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('Email already exists, please try again'));
    else next(error);
});

ExpertSchema.set('toObject', { virtuals: true });
ExpertSchema.set('toJSON', { virtuals: true });
ExpertSchema.plugin(mongoosePaginate);
const Expert = mongoose.model('Expert', ExpertSchema);

exports.validateExpert = validateExpert;
exports.validateExpertEdit = validateExpertEdit;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;
const Joi = require('joi');

const STATUS = ["blocked", "active", "pending"];

const RequestSchema = new Schema({
    user_id: { type: Schema.ObjectId, ref: "User" },
    slug: { type: String, unique: true, require: true },
    datetime_start: { type: Date, require: true },
    datetime_end: { type: Date, require: true },
    reason: { type: String },
    status: { type: String, enum: STATUS, default: STATUS[2] },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, {
    timestamps: true
})

function validateRequest(request) {
    const schema = {
        user_id: Joi.any(),
        slug: Joi.string().min(1).max(50).required(),
        datetime_start: Joi.date().required(),
        datetime_end: Joi.date().required(),
        reason: Joi.string().allow(''),
        status: Joi.string().valid(STATUS).required(),
        createdAt: Joi.date(),
        updatedAt: Joi.date()

    }
    return Joi.validate(request, schema, { abortEarly: false })
}

function validateRequestEdit(request) {
    const schema = {
        user_id: Joi.any(),
        slug: Joi.string().min(1).max(50),
        datetime_start: Joi.date(),
        datetime_end: Joi.date(),
        reason: Joi.string().allow(''),
        status: Joi.string().valid(STATUS),
        createdAt: Joi.date(),
        updatedAt: Joi.date()

    }
    return Joi.validate(request, schema, { abortEarly: false })
}

RequestSchema.virtual('created_at').get(function () {
    return moment(this.createdAt).format("DD-MM-YYYY hh:mm:ss");
})

RequestSchema.virtual('updated_at').get(function () {
    return moment(this.updatedAt).format("DD-MM-YYYY hh:mm:ss");
})

RequestSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('Slug already exists, please try again'));
    else next(error);
});


RequestSchema.set('toObject', { virtuals: true });
RequestSchema.set('toJSON', { virtuals: true });
RequestSchema.plugin(mongoosePaginate);
const Request = mongoose.model('Request', RequestSchema);
exports.validateRequest = validateRequest;
exports.validateRequestEdit = validateRequestEdit;
exports.validateRequestEdit = validateRequestEdit;
exports.Request = Request;

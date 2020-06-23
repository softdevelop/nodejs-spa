const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");
const MpathPlugin = require('mongoose-mpath');

const Schema = mongoose.Schema;
const Joi = require('joi');

const STATUS = ["blocked", "active", "pending"]

const BookingSchema = new Schema({
    name: { type: String, require: true},
    phone: {type: Number, require: true },
    address: {type: String, require: true},
    date: {type: Date, require: true},
    message: {type: String, require: true},
    note: {type: String},
    status: { type: String, enum: STATUS, default: STATUS[2] },
    spa_id: {type: String, require: true},
    service_id: {type: String, require: true},
},{
    timestamps: true
}
)

function validateBooking(booking){
    const schema = {
        name: Joi.string().min(1).max(50).required(),
        phone: Joi.string().max(10).required(),
        address: Joi.string(),
        date: Joi.date(),
        message:Joi.string().allow(''),
        note: Joi.string().allow(''),
        status: Joi.string().valid(STATUS).required(),
        spa_id: Joi.string().min(1).max(50).required(),
        service_id: Joi.string().min(1).max(50).required(),
    }
    return Joi.validate(booking, schema, { abortEarly: false });
}

function validateBookingEdit(booking){
    const schema = {
        name: Joi.string().min(1).max(50).required(),
        phone: Joi.string().required(),
        address: Joi.string(),
        date: Joi.date(),
        message:Joi.string().allow(''),
        note: Joi.string().allow(''),
        status: Joi.string().valid(STATUS).required(),
        spa_id: Joi.string().min(1).max(50).required(),
        service_id: Joi.string().min(1).max(50).required(),
    }
    return Joi.validate(booking, schema, { abortEarly: false });
}

BookingSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error({name: 'This field is duplicated'}));
    else next(error);
});

BookingSchema.virtual('services', {
    ref: 'SpasService',
    localField: 'service_id',
    foreignField: '_id',
    justOne: true
});

BookingSchema.virtual('spas', {
    ref: 'Spa',
    localField: 'spa_id',
    foreignField: '_id',
    justOne: true
});
BookingSchema.virtual('date_form').get(function () {
    return moment(this.createdAt).format("YYYY-MM-DD");
})

BookingSchema.set('toObject', { virtuals: true });
BookingSchema.plugin(mongoosePaginate);
const Booking = mongoose.model('Booking',BookingSchema);
exports.Booking = Booking;
exports.validateBooking = validateBooking;
exports.validateBookingEdit = validateBookingEdit;

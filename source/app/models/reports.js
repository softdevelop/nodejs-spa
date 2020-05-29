const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;
const Joi = require('joi');

const STATUS = ["blocked", "active", "pending"];
const ReportSchema = new Schema({
    user_id: { type: String, require: true },
    project_id: { type: String, require: true },
    time_start: { type: Date, require: true },
    time_end: { type: Date, require: true },
    work_time: { type: Number, require: true },
    job: { type: String, require: true },
    note: { type: String },
    status: { type: String, enum: STATUS, default: STATUS[2] },
    createdAt: { type: Date },
    updatedAt: { type: Date }

}, {
    timestamps: true
})

function validateReport(report) {
    const schema = {
        user_id: Joi.string().min(1).max(50).required(),
        project_id: Joi.string().min(1).max(50).required(),
        time_start: Joi.date(),
        time_end: Joi.date(),
        work_time: Joi.number().required(),
        job: Joi.string().min(1).max(50).required(),
        note: Joi.string().allow(''),
        status: Joi.string().valid(STATUS).required(),
        createdAt: Joi.date(),
        updatedAt: Joi.date()
    }
    return Joi.validate(report, schema, { abortEarly: false });
}
function validateReportEdit(report) {
    const schema = {
        user_id: Joi.string().min(1).max(50),
        project_id: Joi.string().min(1).max(50),
        time_start: Joi.date(),
        time_end: Joi.date(),
        work_time: Joi.number(),
        job: Joi.string().min(1).max(50),
        note: Joi.string().allow(''),
        status: Joi.string().valid(STATUS),
        createdAt: Joi.date(),
        updatedAt: Joi.date()
    }
    return Joi.validate(report, schema, { abortEarly: false });
}

ReportSchema.virtual('created_at').get(function () {
    return moment(this.createdAt).format("DD-MM-YYYY hh:mm:ss");
})

ReportSchema.virtual('updated_at').get(function () {
    return moment(this.updatedAt).format("DD-MM-YYYY hh:mm:ss");
})

ReportSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('Slug already exists, please try again'));
    else next(error);
});

const dataMigrate = []
ReportSchema.statics.getMigrateData = function () {
    return dataMigrate;
}

ReportSchema.set('toObject', { virtuals: true });
ReportSchema.set('toJSON', { virtuals: true });
ReportSchema.plugin(mongoosePaginate);
const Report = mongoose.model('Report', ReportSchema);

exports.validateReport = validateReport;
exports.validateReportEdit = validateReportEdit;
exports.Report = Report;
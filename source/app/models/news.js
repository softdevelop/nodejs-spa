const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");
const MpathPlugin = require('mongoose-mpath');

const Schema = mongoose.Schema;
const Joi = require('joi');

const STATUS = ["blocked", "active", "pending"];
const NewSchema = new Schema({
    name: { type: String, unique: true, require:true},
    slug: { type: String, unique: true, required: true },
    content: {type: String, require:true},
    date: {type: Date, require: true},
    image:  { type: Object, required: true },
    status:{ type: String, enum: STATUS, default: STATUS[2] },
    numOfViews:{type: Number, require},
    spa_id: {type: String, require: true},
    createBy: {type: String, require: true},
    category_ids: {type: Array, required: true },
},{
    timestamps: true
}
)

function validateNew(news){
    const schema = {
        name: Joi.string().min(1).max(100).required(),
        slug: Joi.string().min(1).max(100).required(),
        content: Joi.string(),
        date: Joi.date(),
        image: Joi.any(),
        status: Joi.string().required(),
        numOfViews: Joi.number(),
        spa_id: Joi.string().min(1).max(50).required(),
        createBy: Joi.string().min(1).max(50).required(),
        category_ids: Joi.allow(),
    }
    return Joi.validate(news , schema, { abortEarly: false });
}

function validateNewEdit(news){
    const schema = {
        name: Joi.string().min(1).max(100).required(),
        slug: Joi.string().min(1).max(100).required(),
        content: Joi.string(),
        date: Joi.date(),
        image: Joi.any(),
        status: Joi.string().required(),
        numOfViews: Joi.number(),
        spa_id: Joi.string().min(1).max(50).required(),
        createBy: Joi.string().min(1).max(50).required(),
        category_ids: Joi.allow(),
    }
    return Joi.validate(news, schema, { abortEarly: false });
}

NewSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error({name: 'This field is duplicated'}));
    else next(error);
});

NewSchema.virtual('spas', {
    ref: 'Spa',
    localField: 'spa_id',
    foreignField: '_id',
    justOne: true
});
NewSchema.virtual('user', {
    ref: 'User',
    localField: 'createBy',
    foreignField: '_id',
    justOne: true
});
NewSchema.virtual('category', {
    ref: 'Category',
    localField: 'category_ids',
    foreignField: '_id',
    justOne: true
});
NewSchema.virtual('date_form').get(function () {
    return moment(this.createdAt).format("YYYY-MM-DD");
})


NewSchema.set('toObject', { virtuals: true });
NewSchema.set('toJSON', { virtuals: true });
NewSchema.plugin(mongoosePaginate);
const New = mongoose.model('New',NewSchema);
exports.New = New;
exports.validateNew = validateNew;
exports.validateNewEdit = validateNewEdit;

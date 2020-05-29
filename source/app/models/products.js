const mongoose = require('mongoose');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;
const Joi = require('joi');

const STATUS = ["blocked", "active", "pending"];

const ProductSchema = new Schema({
  name: { type: String,  required: true },
  slug: { type: String,  required: true },
  category_id: { type: String, unique: true, required: true },
  imgs: { type: [{ type: Object}], default: []},
  price: { type: Number, default: 0},
  description: { type: String },
  status: { type: String, enum: STATUS, default: STATUS[2] },
  createdBy: { type: Schema.Types.ObjectId, required: true }
}, {
    timestamps: true,
    versionKey: false // count edited
})


function validateProduct(product) {
    const schema = {
        name: Joi.string().min(1).max(50).required(),
        slug: Joi.string().min(1).max(50).required(),
        category_id: Joi.string().min(5).max(255).required(),
        imgs: Joi.array().required(),
        price: Joi.number().default(0),
        status: Joi.string().valid(STATUS).required(),
        description: Joi.string().allow('')
    };
    return Joi.validate(product, schema, {abortEarly: false});
}

function validateProductEdit(product) {
    const schema = {
        name: Joi.string().min(1).max(50).required(),
        slug: Joi.string().min(1).max(50).required(),
        category_id: Joi.string().min(5).max(255).required(),
        imgs: Joi.array().required(),
        price: Joi.number().default(0),
        status: Joi.string().valid(STATUS).required(),
        description: Joi.string().allow('')
    };
    return Joi.validate(product, schema, {abortEarly: false});
}


ProductSchema.virtual('created_at').get(function () {
    return moment(this.createdAt).format("DD-MM-YYYY hh:mm:ss");
})



ProductSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('Email already exists, please try again'));
    else next(error);
});



const dataMigrate = () => {
  return [...Array(100).keys()].map(item=>{
    return ({
        name: `Product ${item}`,
        slug: `slug product ${item}`,
        category_id: `${item} id`,
        imgs: [`img_${item}_1`,`img_${item}_2`],
        price: Math.random().toString().substring(5),
        description: `product${item}`,
        createdBy: '5ea1463cbe1d2a1a8754f35e'
    })
  })
}


ProductSchema.statics.getMigrateData = function () {
    return dataMigrate();
}

ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', ProductSchema);

exports.validateProduct = validateProduct;
exports.validateProductEdit = validateProductEdit;
exports.Product = Product;
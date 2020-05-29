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
    note: { type: String, default: '' },
    owners: { type: Schema.Types.ObjectId },
    imgs: { type: [{ type: Object}], default: []},
  }, {
    timestamps: true,
})

/**
 * virtual
 */
SpaSchema.virtual('created_at').get(function () {
    return moment(this.createdAt).format("DD-MM-YYYY hh:mm:ss");
})

SpaSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('Email already exists, please try again'));
    else next(error);
});

const genSpas = () => {
    return [...Array(100).keys()].map(item => {
        return ({
          name: `spa_${item}`,
          slug: `spa_${item}`,
          description: `spa_${item}`,
          latitude: `spa_${item}`,
          longitude: `spa_${item}`,
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
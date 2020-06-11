const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const Joi = require('joi');
const STATUS = ["blocked", "active", "pending"]

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
    owner: { type: Schema.Types.ObjectId },
    imgs: { type: [{ type: Object}], default: []},
    logo: { type: Object },
  }, {
    timestamps: true,
})
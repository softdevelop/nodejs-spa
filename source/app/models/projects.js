const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;
const Joi = require('joi');

const STATUS = ["blocked", "active", "pending"];

const ProjectSchema = new Schema({
    name: { type: String, require: true },
    slug: { type: String, unique: true, require: true },
    imgs: { type: Object, require: true },
    description: { type: String },
    status: { type: String, enum: STATUS, default: STATUS[2] },
    createdBy: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }

}, {
    timestamps: true
})
function validateProject(project) {
    const schema = {
        name: Joi.string().min(1).max(50).required(),
        slug: Joi.string().min(1).max(50).required(),
        imgs: Joi.any(),
        description: Joi.string().allow(''),
        status: Joi.string().valid(STATUS).required(),
        createdBy:  Joi.any(),
        createdAt: Joi.date(),
        updatedAt: Joi.date()
    }
    return Joi.validate(project, schema, { abortEarly: false })

}

function validateProjectEdit(project) {
    const schema = {
        name: Joi.string().min(1).max(50),
        slug: Joi.string().min(1).max(50),
        imgs: Joi.any(),
        description: Joi.string().allow(''),
        status: Joi.string().valid(STATUS),
        createdBy: Joi.string().min(1).max(50),
        createdAt: Joi.date(),
        updatedAt: Joi.date()
    }
    return Joi.validate(project, schema, { abortEarly: false })
}

ProjectSchema.virtual('user', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true,
});

ProjectSchema.virtual('created_at').get(function () {
    return moment(this.createdAt).format("DD-MM-YYYY hh:mm:ss");
})

ProjectSchema.virtual('updated_at').get(function () {
    return moment(this.updatedAt).format("DD-MM-YYYY hh:mm:ss");
})

ProjectSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('Slug already exists, please try again'));
    else next(error);
});

const genProjects = () => {
  return [...Array(100).keys()].map(item => {
      return ({
          name: `Project`,
          slug: `LProject ${item}`,
          imgs: [],
          createdBy: '5e9951ce1c01f9226af08ddd'
      })
  })
}
const dataMigrate = [
  ...genProjects()
];

ProjectSchema.statics.getMigrateData = function () {
    return dataMigrate;
}

ProjectSchema.set('toObject', { virtuals: true });
ProjectSchema.set('toJSON', { virtuals: true });
ProjectSchema.plugin(mongoosePaginate);
const Project = mongoose.model('Project', ProjectSchema);
exports.validateProject = validateProject;
exports.validateProjectEdit = validateProjectEdit;
exports.validateProjectEdit = validateProjectEdit;
exports.Project = Project;
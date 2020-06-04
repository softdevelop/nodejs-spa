const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const Joi = require('joi');

const STATUS = ["blocked", "active", "pending"];

const RoleSchema = new Schema({
    name: { type: String, unique: true, required: true },
    value: { type: String, unique: true, required: true },
    permissions: { type: Array, default: []},
  }, {
    timestamps: true,
})


function validateRole(spa) {
  const schema = {
      name: Joi.string().min(1).max(50).required(),
      value: Joi.string().min(1).max(50).required(),
      permissions: Joi.any(),
  };
  return Joi.validate(spa, schema, { abortEarly: false });
}

function validateRoleEdit(spa) {
  const schema = {
      name: Joi.string().min(1).max(50).required(),
      value: Joi.string().min(1).max(50).required(),
      permissions: Joi.any(),
  };
  return Joi.validate(spa, schema, { abortEarly: false });
}

/**
 * virtual
 */
RoleSchema.virtual('created_at').get(function () {
    return moment(this.createdAt).format("DD-MM-YYYY hh:mm:ss");
})

RoleSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error({name: 'This field is duplicated'}));
    else next(error);
});

const dataMigrate = [
  {
    name: 'admin',
    value: 'ADMIN',
    permissions: [
      'user.index',
      'user.edit',
      'user.view',
      'user.delete',
      'user.create',
      'spa.index',
      'spa.edit',
      'spa.view',
      'spa.delete',
      'spa.create',
      'blog.index',
      'blog.edit',
      'blog.view',
      'blog.delete',
      'blog.create',
      'role.index',
      'role.edit',
      'role.view',
      'role.delete',
      'role.create',
      'staticpage.index',
      'staticpage.edit',
      'staticpage.view',
      'staticpage.delete',
      'staticpage.create',
      'qa.index',
      'qa.edit',
      'qa.view',
      'qa.delete',
      'qa.create',
    ]
  },
  {
    name: 'user',
    value: 'USER',
    permissions: []
  },
  {
    name: 'spa owner',
    value: 'SPA_OWNER',
    permissions: [
      'spa.edit',
      'spa.view',
      'spa.delete',
    ]
  },
  {
    name: 'user management',
    value: 'USER_MANAGEMENT',
    permissions: [
      'user.index',
      'user.edit',
      'user.view',
      'user.delete',
    ]
  }
];

RoleSchema.statics.getMigrateData = function () {
    return dataMigrate;
}

RoleSchema.set('toObject', { virtuals: true });
RoleSchema.set('toJSON', { virtuals: true });
RoleSchema.plugin(mongoosePaginate);
const Role = mongoose.model('Role', RoleSchema);

exports.Role = Role;
exports.validateRole = validateRole;
exports.validateRoleEdit = validateRoleEdit;
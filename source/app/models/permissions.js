const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const Joi = require('joi');

const PermissionSchema = new Schema({
    value: { type: String, unique: true, required: true },
  }, {
    timestamps: true,
})


function validatePermission(spa) {
  const schema = {
      value: Joi.string().min(1).max(50).required(),
  };
  return Joi.validate(spa, schema, { abortEarly: false });
}

function validatePermissionEdit(spa) {
  const schema = {
      value: Joi.string().min(1).max(50).required(),
  };
  return Joi.validate(spa, schema, { abortEarly: false });
}

/**
 * virtual
 */
PermissionSchema.virtual('created_at').get(function () {
    return moment(this.createdAt).format("DD-MM-YYYY hh:mm:ss");
})

PermissionSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error({name: 'This field is duplicated'}));
    else next(error);
});

const dataMigrate = [
  { value: "user.index" },
  { value: "user.edit" },
  { value: "user.view" },
  { value: "user.delete" },

  { value: "spa.index" },
  { value: "spa.edit" },
  { value: "spa.view" },
  { value: "spa.delete" },

  { value: "blog.index" },
  { value: "blog.edit" },
  { value: "blog.view" },
  { value: "blog.delete" },

  { value: "role.index" },
  { value: "role.edit" },
  { value: "role.view" },
  { value: "role.delete" },
  
];

PermissionSchema.statics.getMigrateData = function () {
    return dataMigrate;
}

PermissionSchema.set('toObject', { virtuals: true });
PermissionSchema.set('toJSON', { virtuals: true });
PermissionSchema.plugin(mongoosePaginate);
const Permission = mongoose.model('Permission', PermissionSchema);

exports.Permission = Permission;
exports.validatePermission = validatePermission;
exports.validatePermissionEdit = validatePermissionEdit;
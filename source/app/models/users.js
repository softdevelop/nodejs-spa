const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const Joi = require('joi');

const ROLES = ["ADMIN", "USER", "SPA_OWNER"];
const STATUS = ["blocked", "active", "pending"];

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    gender: { type: Number, default: 1 },
    phone: { type: String },
    address: { type: String },
    birthday: { type: Date },
    avatar: { type: Object },
    role: { type: String, enum: ROLES, required: true },
    status: { type: String, enum: STATUS, default: STATUS[2] },
    note: { type: String, default: '' },
    token_verify_email: { type: String, default: '' }
}, {
    timestamps: true,
})


function validateUser(user) {
    const schema = {
        first_name: Joi.string().min(1).max(50).required(),
        last_name: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        repassword: Joi.string().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
        gender: Joi.number(),
        phone: Joi.string().allow(''),
        address: Joi.string().allow(''),
        birthday: Joi.date().required(),
        role: Joi.string().valid(ROLES).required(),
        status: Joi.string().valid(STATUS).required(),
        avatar: Joi.any(),
        note: Joi.string().allow(''),
        token_verify_email: Joi.string().allow('')
    };
    return Joi.validate(user, schema, { abortEarly: false });
}



function validateUserEdit(user) {
    const schema = {
        first_name: Joi.string().min(1).max(50).required(),
        last_name: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).allow(''),
        repassword: Joi.string().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
        gender: Joi.number(),
        phone: Joi.string().allow(''),
        address: Joi.string().allow(''),
        birthday: Joi.date().required(),
        role: Joi.string().valid(ROLES).required(),
        status: Joi.string().valid(STATUS).required(),
        avatar: Joi.any(),
        note: Joi.string().allow('')
    };
    return Joi.validate(user, schema, { abortEarly: false });
}
function validateUserEditApi(user) {
    const schema = {
        first_name: Joi.string().min(1).max(50),
        last_name: Joi.string().min(1).max(50),
        email: Joi.string().min(5).max(255).email(),
        password: Joi.string().min(5).max(255).allow(''),
        repassword: Joi.string().valid(Joi.ref('password')).options({ language: { any: { allowOnly: 'must match password' } } }),
        gender: Joi.number(),
        phone: Joi.string().allow(''),
        address: Joi.string().allow(''),
        birthday: Joi.date(),
        role: Joi.string().valid(ROLES),
        status: Joi.string().valid(STATUS),
        avatar: Joi.any(),
        note: Joi.string().allow('')
    };
    return Joi.validate(user, schema, { abortEarly: false });
}
function validateVerifyEmail(data) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        token_verify_email: Joi.string().required()
    }
    return Joi.validate(data, schema)
}

function validatePass(data) {
    const schema = {
        password: Joi.string().min(8).max(255),
    };
    return Joi.validate(data, schema);
}

function validateResetPass(data) {
    const schema = {
        id: Joi.string().min(8).max(255),
        password: Joi.string(),
        newPass: Joi.string().min(8).max(255),
        newPassRetype: Joi.string().valid(Joi.ref('newPass')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
    };
    return Joi.validate(data, schema);
}

function validateEditUser(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
    };
    return Joi.validate(user, schema);
}

function validateLogin(user) {
    const schema = {
        password: Joi.string().min(8).max(255).required()
    };
    return Joi.validate(user, schema);
}

function validateAdminLogin(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    };
    return Joi.validate(user, schema);
}

function validateEmail(user) {
    const schema = {
        email: Joi.string().max(255).required().email(),
    };
    return Joi.validate(user, schema);
}

/**
 * virtual
 */

UserSchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'createdBy'
});

UserSchema.virtual('created_at').get(function () {
    return moment(this.createdAt).format("DD-MM-YYYY hh:mm:ss");
})

UserSchema.virtual('birthday_at').get(function () {
    return moment(this.createdAt).format("DD/MM/YYYY");
})
/**
 * Method
 */
UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

UserSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('Email already exists, please try again'));
    else next(error);
});

const dfPass = bcrypt.hashSync("12345", 10);

const genUsers = () => {
    return [...Array(100).keys()].map(item => {
        let role = ROLES[Math.floor(Math.random()*ROLES.length)];
        return ({
            first_name: `${role}`,
            last_name: `L${role} ${item}`,
            email: `${role}${item}@gmail.com`.toLowerCase(),
            password: dfPass,
            phone: Math.random().toString().substring(5),
            address: `Address_${item}`,
            birthday: `12/20/1997`,
            role: `${role}`,
        })
    })
}
const dataMigrate = [
    {
        first_name: `Admin`,
        last_name: `LAdmin`,
        email: 'admin@gmail.com',
        password: dfPass,
        role: ROLES[0],
        phone: Math.random().toString().substring(5),
        address: `Address_admin`,
        birthday: `12/20/1997`
    },
    {
      first_name: `Spa`,
      last_name: `LSpa`,
      email: 'spa@gmail.com',
      password: dfPass,
      role: ROLES[2],
      phone: Math.random().toString().substring(5),
      address: `Address_spa`,
      birthday: `12/20/1997`
    },
    {
      first_name: `User`,
      last_name: `LUser`,
      email: 'user@gmail.com',
      password: dfPass,
      role: ROLES[1],
      phone: Math.random().toString().substring(5),
      address: `Address_user`,
      birthday: `12/20/1997`
    },
    ...genUsers()
];

UserSchema.statics.getMigrateData = function () {
    return dataMigrate;
}

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });
UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', UserSchema);

exports.validateUser = validateUser;
exports.validateUserEdit = validateUserEdit;
exports.validatePass = validatePass;
exports.validateLogin = validateLogin;
exports.validateAdminLogin = validateAdminLogin;
exports.validateEmail = validateEmail;
exports.validateEditUser = validateEditUser;
exports.validateResetPass = validateResetPass;
exports.validateUserEditApi = validateUserEditApi;
exports.validateVerifyEmail = validateVerifyEmail;
exports.ROLES = ROLES;
exports.User = User;
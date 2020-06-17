const mongoose = require('mongoose');
const moment = require("moment")
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;
const Joi = require('joi');

const STATUS = ["blocked", "active", "pending"]

const ServiceSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: Object, required: false },
  status: { type: String, enum: STATUS, default: STATUS[2] },
  spa_id_recommend: { type: Schema.Types.ObjectId, required: false}
},{
    timestamps: true
  }
)

function validateService(service){
    const schema = {
      title: Joi.string().max(50).required(),
      content: Joi.string().required(),
      status: Joi.string().required(),
      // image: Joi.object(),
    }
    return Joi.validate(service, schema, { abortEarly: false });
}

function validateServiceEdit(service){
    const schema = {
      title: Joi.string().max(50).required(),
      content: Joi.string().required(),
      status: Joi.string().required(),
    }
    return Joi.validate(service, schema, { abortEarly: false });
}

ServiceSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error({name: 'This field is duplicated'}));
    else next(error);
});

ServiceSchema.virtual('date_form').get(function () {
    return moment(this.createdAt).format("YYYY-MM-DD");
})

ServiceSchema.set('toObject', { virtuals: true });
ServiceSchema.plugin(mongoosePaginate);
const Service = mongoose.model('Service',ServiceSchema);
exports.Service = Service;
exports.validateService = validateService;
exports.validateServiceEdit = validateServiceEdit;

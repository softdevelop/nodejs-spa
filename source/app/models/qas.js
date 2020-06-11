const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const Joi = require("joi");

const STATUS = ["blocked", "active", "pending"];

const QASchema = new Schema(
  {
    question: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    answer: { type: String, required: true },
    status: { type: String, enum: STATUS, default: STATUS[2] },
  },
  {
    timestamps: true,
  }
);

function validateQA(qa) {
  const schema = {
    question: Joi.string().min(1).max(200).required(),
    slug: Joi.string().min(1).max(200).required(),
    answer: Joi.string().min(1).required(),
    status: Joi.string().required(),
  };
  return Joi.validate(qa, schema, { abortEarly: false });
}

function validateQAEdit(qa) {
  const schema = {
    question: Joi.string().min(1).max(200).required(),
    slug: Joi.string().min(1).max(200).required(),
    answer: Joi.string().min(1).required(),
    status: Joi.string().required(),
  };
  return Joi.validate(qa, schema, { abortEarly: false });
}

/**
 * virtual
 */
QASchema.virtual("created_at").get(function () {
  return moment(this.createdAt).format("DD-MM-YYYY hh:mm:ss");
});

QASchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000)
    next(new Error({ name: "This field is duplicated" }));
  else next(error);
});

const genQAs = () => {
  return [...Array(5).keys()].map((item) => {
    return {
      question: `qa_${item}`,
      slug: `qa_${item}`,
      answer: `qa_${item}`,
      status: STATUS[2],
    };
  });
};
const dataMigrate = [...genQAs()];

QASchema.statics.getMigrateData = function () {
  return dataMigrate;
};

QASchema.set("toObject", { virtuals: true });
QASchema.set("toJSON", { virtuals: true });
QASchema.plugin(mongoosePaginate);
const QA = mongoose.model("Qa", QASchema);

exports.QA = QA;
exports.validateQA = validateQA;
exports.validateQAEdit = validateQAEdit;

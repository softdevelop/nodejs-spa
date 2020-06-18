const constants = require("./constants");
const funcUtil = require("./func");
const fileUtil = require("./file");
const {genHtmlPagination, genHtmlPaginationClient} = require("./genHtmlPagination");
const genCategory = require("./genCategory");
const urlMediaUpload = require("./urlMediaUpload")

module.exports = {
    constants,
    funcUtil,
    fileUtil,
    mailerUtil: require('./mailer'),
    envApiKeys: require('./envApiKeys'),
    dateUtil: require('./dateHandler'),
    genHtmlPagination,
    genHtmlPaginationClient,
    urlMediaUpload,
    genCategory
}
const router = require("express").Router();
const homes = require('../../../app/controllers/client/homes')
const multer = require("multer");
const { uploadMedia } = require("../../middleware");

router.get('/',homes.getListSpa);

module.exports = router;
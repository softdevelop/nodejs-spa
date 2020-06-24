const router = require("express").Router();
const users = require("../../../app/controllers/admin/users");
// multer
const multer = require("multer");
const { uploadMedia } = require("../../middleware");
const { hasPermission } = require("../../middleware");

router.get("/test", hasPermission('user.index'), users.getListUsers);


module.exports = router;

const router = require("express").Router();
const users = require("../../../app/controllers/admin/users");
// multer
const multer = require("multer");
const { uploadMedia } = require("../../middleware");
const { hasPermission } = require("../../middleware");

router.get("/users", hasPermission('user.index'), users.getListUsers);
router.get("/users/create", hasPermission('user.create'), users.getFormCreate);
router.post("/users/create",  uploadMedia.fields([
  { name: 'avatar', maxCount: 1 }
]), hasPermission('user.create'), users.create);
router.get("/users/:id", hasPermission('user.view'), users.viewDetail);
router.get("/users/:id/edit", hasPermission('user.edit'), users.getFormEdit);
router.post("/users/:id/edit",  uploadMedia.fields([
  { name: 'avatar', maxCount: 1 }
]), hasPermission('user.edit'), users.edit);
router.post("/users/delmany",hasPermission('user.delete'), users.delMany);

module.exports = router;

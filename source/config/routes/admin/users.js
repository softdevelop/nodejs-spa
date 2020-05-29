const router = require("express").Router();
const users = require("../../../app/controllers/admin/users");
// multer
const multer = require("multer");
const { uploadMedia } = require("../../middleware");

router.get("/users", users.getListUsers);
router.get("/users/create", users.getFormCreate);
router.post("/users/create",  uploadMedia.fields([
  { name: 'avatar', maxCount: 1 }
]), users.create);
router.get("/users/:id", users.viewDetail);
router.get("/users/:id/edit", users.getFormEdit);
router.post("/users/:id/edit",  uploadMedia.fields([
  { name: 'avatar', maxCount: 1 }
]), users.edit);
router.post("/users/delmany", users.delMany);

module.exports = router;

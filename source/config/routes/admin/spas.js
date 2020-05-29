const router = require("express").Router();
const spas = require("../../../app/controllers/admin/spas");
// multer
const multer = require("multer");
const { uploadMedia } = require("../../middleware");

router.get("/spas", spas.getListSpas);
router.get("/spas/create", spas.getFormCreate);
router.post("/spas/create",  uploadMedia.fields([
  { name: 'avatar', maxCount: 1 }
]), spas.create);
router.get("/spas/:id", spas.viewDetail);
router.get("/spas/:id/edit", spas.getFormEdit);
router.post("/spas/:id/edit",  uploadMedia.fields([
  { name: 'avatar', maxCount: 1 }
]), spas.edit);
router.post("/spas/delmany", spas.delMany);

module.exports = router;

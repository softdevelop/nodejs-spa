const router = require("express").Router();
const services = require("../../../app/controllers/admin/services");
const { uploadMedia } = require("../../middleware");

router.get("/services", services.getListServices);
router.get("/services/create", services.getFormCreate)
router.post("/services/create", uploadMedia.fields([
  { name: 'image', maxCount: 1 }
]), services.create)
router.get("/services/:id/edit", services.getFormEdit)
router.post("/services/:id/edit", uploadMedia.fields([
  { name: 'image', maxCount: 1 }
]), services.edit)
router.post("/services/delmany", services.delMany)
router.get("/services/:id/view", services.viewDetail)
module.exports = router;
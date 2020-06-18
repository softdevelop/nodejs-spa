const router = require("express").Router();
const services = require("../../../app/controllers/admin/services");
const { uploadMedia } = require("../../middleware");
const { hasPermission } = require("../../middleware");

router.get("/services", hasPermission('service.index'), services.getListServices);
router.get("/services/create", hasPermission('service.index'), services.getFormCreate)
router.post("/services/create", uploadMedia.fields([
  { name: 'image', maxCount: 1 }
]), hasPermission('service.index'), services.create)
router.get("/services/:id/edit", hasPermission('service.index'), services.getFormEdit)
router.post("/services/:id/edit", uploadMedia.fields([
  { name: 'image', maxCount: 1 }
]), hasPermission('service.index'), services.edit)
router.post("/services/delmany", hasPermission('service.index'), services.delMany)
router.get("/services/:id/view", hasPermission('service.index'), services.viewDetail)
module.exports = router;
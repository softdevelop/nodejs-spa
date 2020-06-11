const router = require("express").Router();
const spas = require("../../../app/controllers/admin/spas");
// multer
const multer = require("multer");
const { uploadMedia } = require("../../middleware");

router.get("/spas", spas.getListSpas);
router.get("/spas/create", spas.getFormCreate);
router.post("/spas/create",  uploadMedia.fields([
  { name: 'logo', maxCount: 1 }
]), spas.create);
router.get("/spas/landing-page", spas.landingPage);
router.post("/spas/landing-page",  uploadMedia.any(), spas.setTemplate);
router.get("/spas/landing-page/preview", spas.getTemplatePreview);
router.get("/spas/landing-page/preview/:id", spas.getTemplateId);
router.get("/spas/:id", spas.viewDetail);
router.get("/spas/:id/edit", spas.getFormEdit);
router.post("/spas/:id/edit",  uploadMedia.fields([
  { name: 'logo', maxCount: 1 }
]), spas.edit);
router.post("/spas/delmany", spas.delMany);
router.get('/spas/:id/service/index',spas.getFormService);
router.get('/spas/:id/service/create', spas.getFormCreateService);
router.post('/spas/:id/service/create', uploadMedia.fields([
  { name: 'image', maxCount: 1 }
]), spas.createService);
router.get('/spas/:id/service/:idService/edit', spas.getFormEditService);
router.post('/spas/:id/service/:idService/edit', uploadMedia.fields([
  { name: 'image', maxCount: 1 }
]), spas.editService)
router.post('/spas/:id/service/delManyService',spas.delManyService)
router.get('/spas/:id/service/:idService',spas.viewDetailService)
module.exports = router;

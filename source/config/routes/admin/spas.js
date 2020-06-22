const router = require("express").Router();
const spas = require("../../../app/controllers/admin/spas");
// multer
const multer = require("multer");
const { uploadMedia } = require("../../middleware");
const { hasPermission } = require("../../middleware");


router.get("/spas", hasPermission('spa.index'), spas.getListSpas);
router.get("/spas/create", hasPermission('spa.create'), spas.getFormCreate);
router.post("/spas/create",  uploadMedia.fields([
  { name: 'logo', maxCount: 1 },{ name: 'imgs', maxCount: 1 }]),  hasPermission('spa.create'), spas.create);

router.get("/spas/landing-page", spas.landingPage);
router.post("/spas/landing-page",  uploadMedia.any(), spas.setTemplate);
router.get("/spas/landing-page/preview", spas.getTemplatePreview);
router.get("/spas/landing-page/preview/:id", spas.getTemplateId);
router.get("/spas/landing-page/example/:id", spas.getTemplateExampleId);

router.get("/spas/:id", hasPermission('spa.view'), spas.viewDetail);
router.get("/spas/:id/edit", hasPermission('spa.edit'), spas.getFormEdit);
router.post("/spas/:id/edit",  uploadMedia.fields([
  { name: 'logo', maxCount: 1 },{ name: 'imgs', maxCount: 1 }]), hasPermission('spa.edit'), spas.edit);
router.post("/spas/delmany", hasPermission('spa.delete'), spas.delMany);
router.get('/spas/:id/service/index', hasPermission('spa.index'), spas.getListService);
router.get('/spas/:id/service/create', hasPermission('spa.create'), spas.getFormCreateService);
router.post('/spas/:id/service/create', uploadMedia.fields([
  { name: 'image', maxCount: 1 }
]), hasPermission('spa.create'), spas.createService);
router.get('/spas/:id/service/:idService/edit', hasPermission('spa.edit'), spas.getFormEditService);
router.post('/spas/:id/service/:idService/edit', uploadMedia.fields([
  { name: 'image', maxCount: 1 }
]), hasPermission('spa.edit'), spas.editService)
router.post('/spas/:id/service/delManyService', hasPermission('spa.delete'), spas.delManyService)
router.get('/spas/:id/service/:idService', hasPermission('spa.view'), spas.viewDetailService)
module.exports = router;

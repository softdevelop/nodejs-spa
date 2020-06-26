const router = require("express").Router();
const spas = require("../../../app/controllers/admin/spas");
const booking = require("../../../app/controllers/admin/booking")
const discount = require("../../../app/controllers/admin/discount")
// multer
const multer = require("multer");
const { uploadMedia } = require("../../middleware");
const { hasPermission, checkRole, hasRole } = require("../../middleware");

//spa

router.get('/spas/bookings', hasRole('SPA_OWNER'), booking.getListBookingOfSpa)
router.get('/spas/bookings/:id/edit', hasRole('SPA_OWNER'), booking.getFormEditOfSpa)
router.post('/spas/bookings/:id/edit', hasRole('SPA_OWNER'), booking.editOfSpa)
router.get('/spas/bookings/:id/view', hasRole('SPA_OWNER'), booking.viewDetailOfSpa)
router.post("/spas/bookings/delmany", hasRole('SPA_OWNER'), booking.delMany)
router.get("/spas/discount",hasRole('SPA_OWNER'), discount.getListDiscount);
router.get("/spas/discount/create",hasRole('SPA_OWNER'), discount.getFormCreate);
router.post("/spas/discount/create", hasRole('SPA_OWNER'),uploadMedia.fields([{ name: 'image', maxCount: 1 }]),  discount.create);
router.get("/spas/discount/:id",hasRole('SPA_OWNER'), discount.viewDetail);
router.get("/spas/discount/:id/edit",hasRole('SPA_OWNER'), discount.getFormEdit);
router.post("/spas/discount/:id/edit", hasRole('SPA_OWNER'), uploadMedia.fields([
  { name: 'image', maxCount: 1 }
]), discount.edit);
//End: spa


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
router.get('/spas/:id/service/:idSpaService/edit', hasPermission('spa.edit'), spas.getFormEditService);
router.post('/spas/:id/service/:idSpaService/edit', uploadMedia.fields([
  { name: 'image', maxCount: 1 }
]), hasPermission('spa.edit'), spas.editService)
router.post('/spas/:id/service/delManyService', hasPermission('spa.delete'), spas.delManyService)
router.get('/spas/:id/service/:idSpaService', hasPermission('spa.view'), spas.viewDetailService)



module.exports = router;

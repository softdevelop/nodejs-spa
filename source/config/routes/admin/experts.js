const router = require("express").Router();
const experts = require("../../../app/controllers/admin/experts");
const { uploadMedia } = require("../../middleware");
const { hasPermission } = require("../../middleware");

router.get('/experts', hasPermission('experts.index'), experts.getListExpert)
router.get('/experts/create', hasPermission('experts.index'), experts.getFormCreate)
router.post("/experts/create",uploadMedia.fields([
    { name: 'images', maxCount: 10 }
  ]),hasPermission('experts.index'),experts.create)
router.get('/experts/:id/edit', hasPermission('experts.index'), experts.getFormEdit)
router.post("/experts/:id/edit",uploadMedia.fields([
  { name: 'images', maxCount: 10 }
]),hasPermission('experts.edit'),experts.edit)

router.get("/experts/:id", hasPermission('experts.view'), experts.viewDetail);
router.get('/experts/:id/service/index', hasPermission('experts.index'), experts.getListService);
router.get('/experts/:id/service/create', hasPermission('experts.create'), experts.getFormCreateService);
router.post('/experts/:id/service/create', uploadMedia.fields([
  { name: 'image', maxCount: 1 }
]), hasPermission('experts.create'), experts.createService);
router.get('/experts/:id/service/:idExpertService/edit', hasPermission('experts.edit'), experts.getFormEditService);
router.post('/experts/:id/service/:idExpertService/edit', uploadMedia.fields([
  { name: 'image', maxCount: 1 }
]), hasPermission('experts.edit'), experts.editService)
router.post('/experts/:id/service/delManyService', hasPermission('experts.delete'), experts.delManyService)
router.get('/experts/:id/service/:idExpertService', hasPermission('experts.view'), experts.viewDetailService)

module.exports = router;
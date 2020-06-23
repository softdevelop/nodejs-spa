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
module.exports = router;
const router = require("express").Router();
const qas = require("../../../app/controllers/admin/qas");
const { hasPermission } = require("../../middleware");

router.get("/q-a", hasPermission('qas.index'), qas.getListQas);
router.get("/q-a/:slug/edit", hasPermission('qas.edit'), qas.getFormEdit);
router.post("/q-a/:id/edit", hasPermission('qas.edit'), qas.edit);
router.get("/q-a/create", hasPermission('qas.create'), qas.getFormCreate);
router.post("/q-a/create", hasPermission('qas.create'), qas.create);
router.post("/q-a/delmany", hasPermission('qas.delete'), qas.delMany);
router.get("/q-a/:slug", hasPermission('qas.view'), qas.viewDetail);

module.exports = router;

const router = require("express").Router();
const staticpages = require("../../../app/controllers/admin/staticpages");
const { hasPermission } = require("../../middleware");

router.get("/static-pages", hasPermission('staticpage.index'), staticpages.getListStaticpages);
router.get("/static-pages/:slug/edit", hasPermission('staticpage.edit'), staticpages.getFormEdit);
router.post("/static-pages/:slug/edit", hasPermission('staticpage.edit'), staticpages.edit);
router.get("/static-pages/create", hasPermission('staticpage.create'), staticpages.getFormCreate);
router.post("/static-pages/create", hasPermission('staticpage.create'), staticpages.create);
router.post("/static-pages/delmany", hasPermission('staticpage.delete'), staticpages.delMany);
router.get("/static-pages/:slug", hasPermission('staticpage.view'), staticpages.viewDetail);

module.exports = router;

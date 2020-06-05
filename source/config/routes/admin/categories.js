const router = require("express").Router();
const categories = require("../../../app/controllers/admin/categories");
const { hasPermission } = require("../../middleware");

router.get("/categories", hasPermission('category.index'), categories.index);
router.get("/categories/:slug/edit", hasPermission('category.edit'), categories.getFormEdit);
router.post("/categories/:id/edit", hasPermission('category.edit'), categories.edit);
router.get("/categories/create", hasPermission('category.create'), categories.getFormCreate);
router.post("/categories/create", hasPermission('category.create'), categories.create);
router.post("/categories/delete", hasPermission('category.delete'), categories.del);
router.get("/categories/:slug", hasPermission('category.view'), categories.viewDetail);

module.exports = router;

const router = require("express").Router();
const roles = require("../../../app/controllers/admin/roles");
const { hasPermission } = require("../../middleware");

router.get("/roles", hasPermission('role.index'), roles.getListRoles);
router.get("/roles/:value/edit", hasPermission('role.edit'), roles.getFormEdit);
router.post("/roles/:value/edit", hasPermission('role.edit'), roles.edit);
router.get("/roles/create", hasPermission('role.create'), roles.getFormCreate);
router.post("/roles/create", hasPermission('role.create'), roles.create);
router.post("/roles/delmany", hasPermission('role.delete'), roles.delMany);
router.get("/roles/:value", hasPermission('role.view'), roles.viewDetail);

module.exports = router;

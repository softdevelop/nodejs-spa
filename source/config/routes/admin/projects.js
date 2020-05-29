const router = require("express").Router();
const projects = require("../../../app/controllers/admin/projects");
// multer
const multer = require("multer");
const { uploadMedia } = require("../../middleware");

router.get("/projects", projects.getListProjects);
router.get("/projects/create", projects.getFormCreate);
router.post("/projects/create",  uploadMedia.fields([
  { name: 'imgs', maxCount: 10 }
]), projects.create);
router.get("/projects/:id", projects.viewDetail);
router.get("/projects/:id/edit", projects.getFormEdit);
router.post("/projects/:id/edit",  uploadMedia.fields([
  { name: 'avatar', maxCount: 1 }
]), projects.edit);
router.post("/projects/delmany", projects.delMany);

module.exports = router;

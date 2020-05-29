const router = require('express').Router();
const { uploadMedia, jwtAuth } = require("../../middleware");
const project = require("../../../app/controllers/api/projects.controller");

router.post('/', jwtAuth, uploadMedia.fields([{ name: 'imgs', maxCount: 1 }]), project.createProject)
router.put('/:id', jwtAuth, uploadMedia.fields([{ name: 'imgs', maxCount: 1 }]), project.editProject)
router.get('/:id', jwtAuth, project.getProject)
router.get('/', jwtAuth, project.getListProject)
router.delete('/:id', jwtAuth, project.deleteProject)
router.delete('/', jwtAuth, project.deleteListProject)
module.exports = router;
const router = require('express').Router();
const { uploadMedia, jwtAuth } = require("../../middleware");
const category = require("../../../app/controllers/api/categories.controller");

router.post('/', jwtAuth, uploadMedia.fields([{ name: 'img', maxCount: 1 }]), category.createCategory)
router.put('/:id', jwtAuth, uploadMedia.fields([{ name: 'img', maxCount: 1 }]), category.editCategory)
router.delete('/:id', jwtAuth, category.deleteCategory)
router.delete('/', jwtAuth, category.deleteListCategory)
router.get('/:id', jwtAuth, category.getCategory)
router.get('/', jwtAuth, category.getListCategory)
module.exports = router;
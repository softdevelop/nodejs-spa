const router = require('express').Router();

const { uploadMedia, jwtAuth, checkRole } = require("../../middleware");
const users = require("../../../app/controllers/api/users.controller");

router.post('/', jwtAuth, checkRole('ADMIN'), uploadMedia.fields([
    { name: 'avatar', maxCount: 1 }
]), users.createUser)
router.get('/',jwtAuth,users.getAllUser)
router.put('/:id', jwtAuth, uploadMedia.fields([
    { name: 'avatar', maxCount: 1 }
]), users.updateUser)
router.get('/:id', jwtAuth, users.getUser)
router.delete('/:id', jwtAuth, checkRole('ADMIN'), users.deleteUser)
router.delete('/', jwtAuth, checkRole('ADMIN'), users.deleteListUser)
module.exports = router;

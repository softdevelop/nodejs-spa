const router = require('express').Router();
const { jwtAuth, checkRole } = require("../../middleware");
const request = require("../../../app/controllers/api/requests.controller");

router.post('/', jwtAuth, request.createRequest)
router.put('/:id', jwtAuth, request.editRequest)
router.get('/:id', jwtAuth, request.getRequest)
router.get('/', jwtAuth, request.getListRequest)
router.delete('/:id', jwtAuth, request.deleteRequest)
router.delete('/', jwtAuth, request.deleteListRequest)
module.exports = router;
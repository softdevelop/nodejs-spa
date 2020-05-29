const router = require('express').Router();
const { jwtAuth } = require("../../middleware");
const report = require("../../../app/controllers/api/reports.controller");

router.post('/', jwtAuth, report.createReport)
router.put('/:id', jwtAuth, report.editReport)
router.get('/:id', jwtAuth, report.getReport)
router.get('/', jwtAuth, report.getListReport)
router.delete('/:id', jwtAuth, report.deleteReport)
router.delete('/', jwtAuth, report.deleteListReport)
router.get("/by-month/def",jwtAuth, report.getMonthInYear)
module.exports = router;
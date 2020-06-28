const router = require("express").Router();
const discount = require("../../../app/controllers/admin/discount")
// multer
const multer = require("multer");
const { uploadMedia } = require("../../middleware");
const { hasPermission, checkRole, hasRole } = require("../../middleware");

router.get("/discount",hasRole('ADMIN'), discount.getListDiscount);
router.get("/discount/create",hasRole('ADMIN'), discount.getFormCreate);
router.post("/discount/create", hasRole('ADMIN'),uploadMedia.fields([{ name: 'image', maxCount: 1 }]),  discount.create);
router.get("/discount/:id",hasRole('ADMIN'), discount.viewDetail);
router.get("/discount/:id/edit",hasRole('ADMIN'), discount.getFormEdit);
router.post("/discount/:id/edit", hasRole('ADMIN'), uploadMedia.fields([
  { name: 'image', maxCount: 1 }
]), discount.edit);
router.post("/discount/delmany",hasRole('ADMIN'), discount.delMany);


module.exports = router;

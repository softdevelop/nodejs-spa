const router = require("express").Router();
// multer
const multer = require("multer");
const { uploadMedia } = require("../../middleware");

router.get("/homes", async (req, res) => {
    res.render('client/homes/index')
  });
// router.post("/products/:id/edit",  uploadMedia.fields([
//   { name: 'avatar', maxCount: 1 }
// ]), products.edit);

module.exports = router;

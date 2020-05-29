const router = require("express").Router();
const products = require("../../../app/controllers/admin/products");
// multer
const multer = require("multer");
const { uploadMedia } = require("../../middleware");

// router.get("/products", (req, res) => {
//     res.send({
//         message: "Page not found ahihihi"
//       })
// })

router.get("/products", products.getListProducts);
router.get("/products/create", products.getFormCreate);

// router.post("/products/create", products.create);
// router.post("/products/create", (req, res) => {
//     res.send({
//         message: "Page not found ahihihi"
//       })
// })

router.post("/products/create",  uploadMedia.fields([
  { name: 'imgs', maxCount: 2 }
]), products.create);

router.get("/products/:id/edit", products.getFormEdit);
// router.post("/products/:id/edit",  uploadMedia.fields([
//   { name: 'avatar', maxCount: 1 }
// ]), products.edit);

module.exports = router;

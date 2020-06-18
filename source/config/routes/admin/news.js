const router = require("express").Router();
const news = require("../../../app/controllers/admin/news");
const { uploadMedia } = require("../../middleware");

router.get("/news", news.getListNew);
router.get("/news/create", news.getFormCreate)
router.post("/news/create", uploadMedia.fields([
    { name: 'image', maxCount: 1 }
  ]), news.create)
router.get("/news/:id/edit", news.getFormEdit)
router.post("/news/:id/edit",uploadMedia.fields([
  { name: 'image', maxCount: 1 }
]), news.edit)
router.post("/news/delmany", news.delMany)
router.get("/news/:id/view", news.viewDetail)
module.exports = router;
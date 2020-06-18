const router = require("express").Router();
const news = require("../../../app/controllers/admin/news");
const { uploadMedia } = require("../../middleware");
const { hasPermission } = require("../../middleware");

router.get("/news", hasPermission('news.index'), news.getListNew);
router.get("/news/create", hasPermission('news.index'), news.getFormCreate)
router.post("/news/create", uploadMedia.fields([
    { name: 'image', maxCount: 1 }
  ]), hasPermission('news.index'), news.create)
router.get("/news/:id/edit", hasPermission('news.index'), news.getFormEdit)
router.post("/news/:id/edit",uploadMedia.fields([
  { name: 'image', maxCount: 1 }
]), hasPermission('news.index'), news.edit)
router.post("/news/delmany", hasPermission('news.index'), news.delMany)
router.get("/news/:id/view", hasPermission('news.index'), news.viewDetail)
module.exports = router;
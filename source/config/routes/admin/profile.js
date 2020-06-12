const router = require("express").Router();
const profile = require("../../../app/controllers/admin/profile");
// multer
const multer = require("multer");
const upload = multer({ dest: "assets/uploads/" });
const { uploadMedia } = require("../../middleware");

router.get("/logout", profile.logoutAccount);
router.get("/profile", profile.viewProfile);
router.post("/profile", profile.upadteProfile);
// router.post("/change-avatar", upload.single("avatar"), profile.changeAvatar);
router.get("/profile/:id/changepass", profile.getFormChangePass);
router.get("/profile/:id/edit", profile.getFormEdit);
router.post("/profile/:id/edit",  uploadMedia.fields([
    { name: 'avatar', maxCount: 1 }
]), profile.edit);

module.exports = router;
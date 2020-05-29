const router = require('express').Router();
const {
    authCtrl
} = require("../../../app/controllers").apiCtrl;
const { uploadMedia, jwtAuth, checkRole } = require("../../middleware");
const users = require("../../../app/controllers/api/users.controller");
router.post("/login", authCtrl.login);
router.post('/reset-password', jwtAuth, authCtrl.resetPassword)
router.post("/logout", jwtAuth, authCtrl.logout);
router.post("/register-user", uploadMedia.fields([
    { name: 'avatar', maxCount: 1 }
]), authCtrl.registerUser)
router.post("/verify-email",jwtAuth,checkRole('USER'),authCtrl.verifyEmail)
module.exports = router;
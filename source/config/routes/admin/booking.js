const router = require("express").Router();
const booking = require("../../../app/controllers/admin/booking");
const { uploadMedia } = require("../../middleware");

router.get("/booking",booking.getListBooking);
router.get("/booking/create", booking.getFormCreate)
router.post("/booking/create", booking.create)
router.get("/booking/:id/edit", booking.getFormEdit)
router.post("/booking/:id/edit", booking.edit)
router.post("/booking/delmany",booking.delMany)
router.get("/booking/:id/view", booking.viewDetail)
module.exports = router;
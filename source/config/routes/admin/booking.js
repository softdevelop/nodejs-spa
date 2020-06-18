const router = require("express").Router();
const booking = require("../../../app/controllers/admin/booking");
const { uploadMedia } = require("../../middleware");
const { hasPermission } = require("../../middleware");

router.get("/booking", hasPermission('booking.index'), booking.getListBooking);
router.get("/booking/create", hasPermission('booking.create'), booking.getFormCreate)
router.post("/booking/create", hasPermission('booking.create'), booking.create)
router.get("/booking/:id/edit", hasPermission('booking.edit'), booking.getFormEdit)
router.post("/booking/:id/edit", hasPermission('booking.edit'), booking.edit)
router.post("/booking/delmany", hasPermission('booking.delete'), booking.delMany)
router.get("/booking/:id/view", hasPermission('booking.view'), booking.viewDetail)
module.exports = router;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Spa = mongoose.model("Spa");
const Booking = mongoose.model("Booking");

const index = async (req, res) => {
  let numOfUser = await User.count({}).exec();
  let numOfUserActive = await User.count({ status: 'active'}).exec();
  let numOfUserPending = await User.count({status: 'pending'}).exec();
  let numOfSpa = await Spa.count({}).exec();
  let numOfSpaActive = await Spa.count({ status: 'active'}).exec();
  let numOfSpaPending = await Spa.count({status: 'pending'}).exec();
  let numOfBooking = await Booking.count({}).exec();
  let numOfBookingActive = await Booking.count({ status: 'active'}).exec();
  let numOfBookingPending = await Booking.count({status: 'pending'}).exec();
  res.render('admin/dashboard/index', {
    numOfUser,
    numOfUserActive,
    numOfUserPending,
    numOfSpa,
    numOfSpaActive,
    numOfSpaPending,
    numOfBooking,
    numOfBookingActive,
    numOfBookingPending,
  })
}

module.exports = {
  index
}
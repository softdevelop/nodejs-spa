const mongoose = require("mongoose");
const User = mongoose.model("User");
const Spa = mongoose.model("Spa");
const Booking = mongoose.model("Booking");
const Service = mongoose.model("Service");
const New = mongoose.model("New");
const Qa = mongoose.model("Qa");
const Staticpage = mongoose.model("Staticpage");

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
  let numOfService = await Service.count({}).exec();
  let numOfServiceActive = await Service.count({ status: 'active'}).exec();
  let numOfServicePending = await Service.count({status: 'pending'}).exec();
  let numOfNews = await New.count({}).exec();
  let numOfNewsActive = await New.count({ status: 'active'}).exec();
  let numOfNewsPending = await New.count({status: 'pending'}).exec();
  let numOfStaticpage = await Staticpage.count({}).exec();
  let numOfStaticpageActive = await Staticpage.count({ status: 'active'}).exec();
  let numOfStaticpagePending = await Staticpage.count({status: 'pending'}).exec();
  let numOfQA = await Qa.count({}).exec();
  let numOfQAActive = await Qa.count({ status: 'active'}).exec();
  let numOfQAPending = await Qa.count({status: 'pending'}).exec();
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
    numOfService,
    numOfServiceActive,
    numOfServicePending,
    numOfNews,
    numOfNewsActive,
    numOfNewsPending,
    numOfStaticpage,
    numOfStaticpageActive,
    numOfStaticpagePending,
    numOfQA,
    numOfQAActive,
    numOfQAPending,
  })
}

module.exports = {
  index
}
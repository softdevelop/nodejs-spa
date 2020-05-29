const mongoose = require("mongoose");
const User = mongoose.model("User");
const Product = mongoose.model("Product");

const index = async (req, res) => {
  let numOfUser = await User.count({}).exec();
  let numOfUserActive = await User.count({ status: 'active'}).exec();
  let numOfProduct = await Product.count({}).exec();
  let numOfProductActive = await Product.count({ status: 'active'}).exec();
  res.render('admin/dashboard/index', {
    numOfUser,
    numOfUserActive,
    numOfProduct,
    numOfProductActive
  })
}

module.exports = {
  index
}
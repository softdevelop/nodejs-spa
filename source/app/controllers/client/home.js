const mongoose = require('mongoose');
const Category = mongoose.model('Category')

const index = async (req, res) => {

  let categoryLevel1 = await Category.getChildrenTree({
    fields: "_id name slug parent path",
    options: { lean: false },
  });

  res.render("client/homes/index", {
    categoryLevel1

  });
};

module.exports = {
  index,
};
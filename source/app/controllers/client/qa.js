const mongoose = require('mongoose');
const Qa = mongoose.model('Qa')

const index = async (req, res) => {
  let data = await Qa.find({ status: 'active'}).exec();
  res.render("client/qas/index", {
    data
  });
};

module.exports = {
  index,
};

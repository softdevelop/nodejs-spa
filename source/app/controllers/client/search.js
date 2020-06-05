const index = (req, res) => {
    res.render('client/search/index', {errors: {}, data: {}})
  }
  module.exports = {
    index
  }
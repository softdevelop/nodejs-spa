const path = require("path")
const router = require('express').Router();
const search = require("../../../app/controllers/client/search")
const home = require("../../../app/controllers/client/homes")
const contact = require('../../../app/controllers/client/contacts')
const booking = require('../../../app/controllers/client/booking')
const service = require('../../../app/controllers/client/services')
const newsDetail = require('../../../app/controllers/client/news')
const { PATH_CLIENT } = require("../../../config")
const {
} = require("../../../app/controllers/client");

router.get("/", home.index );
router.get("/search",search.index) ;
router.get('/contact',contact.index)
router.get('/booking', booking.index)
router.get('/services', service.index)
router.get('/news', newsDetail.index)
router.get("*", (req, res) => {
  res.render('client/404')
});

// router.get("*", (req, res) => {
//     res.sendFile(path.join(PATH_CLIENT, 'build', 'index.html'));
// });
module.exports = router;
const path = require("path")
const router = require('express').Router();
const search = require("../../../app/controllers/client/search")
const home = require("../../../app/controllers/client/home")
const contact = require('../../../app/controllers/client/contact')
const booking = require('../../../app/controllers/client/booking')
const service = require('../../../app/controllers/client/service')
const newsDetail = require('../../../app/controllers/client/news')
const staticPage = require('../../../app/controllers/client/staticpage')
const { PATH_CLIENT } = require("../../../config")
const {
} = require("../../../app/controllers/client");
const { getHeader } = require("../../middleware");
router.use(getHeader);

router.get("/", home.index );
router.get("/search", search.index) ;
router.get('/contact', contact.index)
router.get('/booking', booking.index)
router.get('/service', service.index)
router.get('/news', newsDetail.index)
router.get("/:slug", staticPage.index);

// router.get("*", (req, res) => {
//     res.sendFile(path.join(PATH_CLIENT, 'build', 'index.html'));
// });
module.exports = router;
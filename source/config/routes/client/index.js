const path = require("path")
const router = require('express').Router();
const search = require("../../../app/controllers/client/search")
const home = require("../../../app/controllers/client/home")
const auth = require("../../../app/controllers/client/auth")
const contact = require('../../../app/controllers/client/contact')
const booking = require('../../../app/controllers/client/booking')
const service = require('../../../app/controllers/client/service')
const spa = require('../../../app/controllers/client/spa')
const newsDetail = require('../../../app/controllers/client/news')
const qa = require('../../../app/controllers/client/qa')
const staticPage = require('../../../app/controllers/client/staticpage')
const { PATH_CLIENT } = require("../../../config")
const {
} = require("../../../app/controllers/client");
const { getHeader } = require("../../middleware");
router.use(getHeader);

router.get("/", home.index );
router.get("/index/trang-:page", home.index );
router.get("/index", home.index );
router.get("/login", auth.login );
router.get("/dang-nhap", auth.login );
router.get("/register", auth.register );
router.get("/dang-ki", auth.register );
router.get("/tim-kiem", search.index) ;
router.get('/lien-he', contact.index)
router.get('/booking', booking.index)
router.get('/service', service.index)
router.get('/news/:slug', newsDetail.view)
router.get('/hoi-dap', qa.index)
router.get('/spa/:slug', spa.landingPage)
router.post('/spa/:slug', spa.booking)
router.get("/:slug", staticPage.index);

// router.get("*", (req, res) => {
//     res.sendFile(path.join(PATH_CLIENT, 'build', 'index.html'));
// });
module.exports = router;
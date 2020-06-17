const router = require("express").Router();
const moment = require('moment');
const { jwtAuth, confirmJWT, getAvatar, getHeader } = require("../../middleware");
const authCtrl = require("../../../app/controllers/admin/auth");
const dashboardCtrl = require("../../../app/controllers/admin/dashboard");

const users = require("./users");
const spas = require("./spas");
const qas = require("./qas");
const staticpages = require("./staticpages");
const roles = require("./roles");
const profile = require("./profile");
const products = require("./products");
const categories = require("./categories");
const booking = require("./booking")
const services = require("./services")

// Controllers
const {
} = require("../../../app/controllers/admin");

// Middleware
const {
} = require("../../../config/middleware");

// login
router.get("/login", authCtrl.viewLoginPage);
router.post("/login", authCtrl.login);

// confirm session
router.use(confirmJWT);
router.use(getAvatar);
router.use(getHeader);

// router.use(jwtAuth);

// dashboard
router.get("/", dashboardCtrl.index);

// user
router.use(users);

// spa
router.use(spas);

// qa
router.use(qas);

// staticpage
router.use(staticpages);

// role
router.use(roles);

// profile
router.use(profile);

// products
router.use(products);

// // projects
// router.use(projects);

// categories
router.use(categories);
router.use(booking);

// service
router.use(services);

router.get("*", (req, res) => {
  res.render('admin/404');
});

module.exports = router;

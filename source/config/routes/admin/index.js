const router = require("express").Router();
const moment = require('moment');
const { jwtAuth, confirmJWT, getAvatar } = require("../../middleware");
const authCtrl = require("../../../app/controllers/admin/auth");
const dashboardCtrl = require("../../../app/controllers/admin/dashboard");

const users = require("./users");
const spas = require("./spas");
const profile = require("./profile");
const products = require("./products");
const projects = require("./projects");

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
// router.use(jwtAuth);

// dashboard
router.get("/", dashboardCtrl.index);

// user
router.use(users);

// spa
router.use(spas);

// profile
router.use(profile);

// products
router.use(products);

// projects
router.use(projects);

router.get("*", (req, res) => {
  res.send({
    message: "Page not found"
  })
});

module.exports = router;

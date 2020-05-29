const router = require("express").Router();


const userRoute = require("./users");
const authRoute = require("./auth");
const categoryRoute = require("./categories")
const projectRoute = require("./projects")
const reportRoute = require("./reports")
const requestRoute = require('./requests')
const { } = require("../../middleware");

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/projects", projectRoute);
router.use("/categories", categoryRoute)
router.use("/reports", reportRoute)
router.use("/requests", requestRoute)
router.get("/test", (req, res) => {
  return res.render("api/index", {
    layout: 'api/layout'
  });
});
router.use("", (req, res) => {
  res.send({
    message: "Welcome to API"
  })
});

module.exports = router;

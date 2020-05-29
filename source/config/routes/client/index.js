const path = require("path")
const router = require('express').Router();

const { PATH_CLIENT } = require("../../../config")

router.get("*", (req, res) => {
  res.redirect('/admin')
});

// router.get("*", (req, res) => {
//     res.sendFile(path.join(PATH_CLIENT, 'build', 'index.html'));
// });

module.exports = router;
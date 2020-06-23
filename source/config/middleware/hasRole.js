module.exports = (role) => {
    return (req, res, next) => {
      if (req.user && req.user._id) {
        if (req.user.role.toUpperCase() === role.toUpperCase()) {
          return next();
        } else {
          res.sendError("Only " + role + " can perform this action !");
        }
      } else {
        res.sendError("Unauthorized user!");
      }
    };
  };
  
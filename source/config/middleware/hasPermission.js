module.exports = (permission) => {
  return (req, res, next) => {
    if (req.user && req.user._id) {
      if(req.user.role === 'ADMIN' || req.user.permissions.includes(permission)){
        return next();
      }else{
        res.render('admin/403')
      }
    } else {
      res.render('admin/403')
    }
  };
};

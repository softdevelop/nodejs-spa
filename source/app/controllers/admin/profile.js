const mongoose = require("mongoose");
const User = mongoose.model("User");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const {genHtmlPagination, urlMediaUpload} = require('../../utils');
const {validateResetPass,validateUser, validateUserProfileEdit} = require('../../models/users');
const { userService } = require("../../services");
viewProfile = async (req, res) => {
  try {
    const _id = req.user._id;
    let user = await User.findById(_id).exec();
    if (!user) throw new Error("User not found!");

    return res.render("admin/profile/index", {
      user,
      urlMediaUpload
    });
  } catch (err) {
    return res.redirect("/admin/login");
  }
};

getFormEdit = async (req, res) => {
  let id = req.user.id
  let user = await User.findById(id).exec();
  res.render('admin/profile/edit', {
    errors: {},
    user,
    urlMediaUpload
  });
}

getFormChangePass = async (req, res) => {
  let id = req.user.id
  res.render('admin/profile/changePass', {
    errors: {},
    id
  });
}


resetPassword = (req, res) => {
  let id = req.user.id;
  let data = {
    id: req.user.id,
    password: req.body.password,
    newPass: req.body.newPass,
    newPassRetype: req.body.newPassRetype
  }
  let err = validateResetPass(data)
  if (err && err.error) {
    let errors = err.error && err.error.details.reduce((result, item) => {
      return  {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    return res.render('admin/profile/changePass', {errors, id})
  } else {
    userService.getUser2(data.id).then(function (result) {
      if (bcrypt.compareSync(data.password, result.password)) {
        data.newPass = bcrypt.hashSync(data.newPass, 10)
        userService.changePassword(result.id, data.newPass)
          .then(data => {
            return res.sendData(data);
          })
          .catch(err => {
            return res.sendError(err);
          })
      }
      else {
        return res.sendError("Password incorrect")
      }
    }).catch(err => {
      return res.sendError(err);
    })
  }
}

upadteProfile = async (req, res) => {
  try {
    const _id = req.user._id;
    const _data = req.body;

    if (_data.password == "") {
      delete _data.password;
      delete _data.re_password;
    } else {
      _data.password = bcrypt.hashSync(_data.password, 10);
      delete _data.re_password;
    }
    let user = await User.findOneAndUpdate(
      { _id },
      { $set: _data },
      (err, response) => {post
        console.log(response);
        if (err) throw err;
      }
    ).exec();

    let result = {
      titlePage: "Profile",
      user,
      moment,
      notification: {
        status: "success",
        action: "update-info",
        msg: "Successfully updated"
      }
    };

    return res.render("admin/profile/index", result);
  } catch (err) {
    let result = {
      titlePage: "Profile",
      moment,
      notification: {
        status: "error",
        action: "update-info",
        msg: "Updated Profile error!"
      }
    };

    return res.render("admin/profile/index", result);
  }
};

edit = async (req, res) => {
  let id = req.user.id
  let data = req.body
  let err = validateUserProfileEdit(data)
  if(err && err.error){
    let errors = err.error && err.error.details.reduce((result, item)=>{
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    data._id = id
    return res.render('admin/profile/edit', {errors, data, urlMediaUpload})
  }else{
    if(req.files.avatar && req.files.avatar[0]){
      data.avatar = req.files.avatar[0]
    }else delete data.avatar

    await User.findById(id).update(data);
    res.redirect('/admin/profile')
  }
}

// change avatar
changeAvatar = async (req, res) => {
  try {
    const _id = req.user._id;
    const _file = req.file;
    const avatar = `/uploads/${_file.filename}`;
    let user = await User.findOneAndUpdate(
      { _id },
      { $set: { avatar } },
      (err, response) => {
        console.log(response);
        if (err) throw err;
      }
    );

    let result = {
      titlePage: "Profile",
      user,
      moment,
      notification: {
        status: "success",
        action: "change-avatar",
        msg: "Successfully updated"
      }
    };

    (await user.avatar) && (req.session.URL_AVATAR = user.avatar);
    (await user.avatar) && (req.app.locals.URL_AVATAR = user.avatar);

    return res.render("admin/profile/index", result);

  } catch (err) {
    let result = {
      titlePage: "Profile",
      moment,
      notification: {
        status: "error",
        action: "change-avatar",
        msg: "Successfully updated"
      }
    };

    return res.render("admin/profile/index", result);
  }
};

// logout account
logoutAccount = (req, res) => {
  req.session.token = null;

  return res.redirect("/admin/login");
};

module.exports = {
  viewProfile,
  upadteProfile,
  changeAvatar,
  logoutAccount,
  getFormEdit,
  edit,
  getFormChangePass,
  resetPassword
};

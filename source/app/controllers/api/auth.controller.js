const mongoose = require("mongoose");
const User = mongoose.model("User");
const { jwtToken, pareJwtToken, makeTokenEmail, createEmail } = require("../../utils/func");
const { userService } = require("../../services");
const { validateResetPass, validateUser, validateVerifyEmail } = require('../../models/users')
var bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')
const {Mailer, EMAIL_TYPE} = require('../../utils/mailer')
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
    
  }
});

const getUserToken = (data) => {
  return jwtToken({
    _id: data._id,
    user: {
      _id: data._id,
      role: data.role,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      status: data.status
    }
  });
}

const login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (email && password) {
    email = email.toLowerCase();
    User.findOne({ "email": email }, async (err, user) => {
      if (user && user.checkPassword(password)) {
        let userDetail = await userService.getUser(user._id);
        res.sendData({
          token: getUserToken(user),
          user: userDetail
        });
      } else {
        res.sendError("Email or password is incorrect", res.CODE.UNAUTHORIZED);
      }
    })
  } else {
    res.sendError("Email and password is required", res.CODE.UNAUTHORIZED);
  }
}

const resetPassword = (req, res) => {
  let data = {
    id: req.body.id,
    password: req.body.password,
    newPass: req.body.new_password,
    newPassRetype: req.body.new_password_retype
  }

  let err = validateResetPass(data)

  if (err && err.error) {
    let errors = err.error && err.error.details.reduce((result, item) => {
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    return res.sendError(errors, data)
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

const logout = (req, res) => {
  req.session.token = null
  return res.send({ age: 'Logout successfully', data: {} })
}

const registerUser = (req, res) => {
  const user = { ...req.body, status: 'pending', role: 'USER', token_verify_email: makeTokenEmail(6) }

  const err = validateUser(user)
  if (err && err.error) {
    let errors = err.error && err.error.details.reduce((result, item) => {
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    return res.sendError(errors)
  } else {
    let newUser = user;
    if (req.files && req.files.avatar) {
      newUser.avatar = req.files.avatar[0]
    }
    newUser.password = bcrypt.hashSync(newUser.password, 10);

    userService.create(newUser)
      .then((data) => {
        return res.sendData(data)
      })
      .then(() => {
        Mailer("no-reply@gmail.com", user.email).sendMail(EMAIL_TYPE.MAIL_VERIFY_EMAIL, {email: user.email, token: user.token_verify_email})
        // transporter.sendMail(createEmail(user.email, user.token_verify_email), function (err, info) {
        //   if (err)
        //     return res.sendError(err)
        //   return info
        // });
      })
      .catch((err) => {
        return res.sendError(err)
      })
  }

}
const verifyEmail = (req, res) => {
  const verifyInfo = req.body
  const err = validateVerifyEmail(verifyInfo)

  if (err && err.error) {
    let errors = err.error && err.error.details.reduce((result, item) => {
      return {
        ...result,
        [item.path[0]]: item.message
      }
    }, {})
    return res.sendError(errors)
  }

  User.findOne({ "email": verifyInfo.email }, async (err, user) => {
    if (user) {
      if (verifyInfo.token_verify_email === user.token_verify_email) {
        userService.updateUser(user.id, {
          'status': 'active',
          'token_verify_email': ''
        })
          .then(() => {
            return res.send({ message: "Email has been verified" })
          })
          .catch(err => res.sendError(err))
      }
      return res.send({ message: "Token invalied" })
    }
  })

}

module.exports = {
  login,
  resetPassword,
  logout,
  registerUser,
  verifyEmail
};

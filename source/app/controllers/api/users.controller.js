const { userService } = require("../../services");
const { jwtToken } = require("../../utils/func");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { genHtmlPagination, urlMediaUpload } = require('../../utils')
const { validateUser, validateUserEditApi } = require('../../models/users')
const bcrypt = require("bcryptjs");

const path = require('path');

const getUser = (req, res) => {
    let id = req.params.id;
    userService.getUser(id)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError();
        })
}
const getAllUser = (req, res) => {
    if (req.user) {
        let { page, limit } = req.query
        var query = {}

        var options = {
            select: "",
            sort: { createdAt: -1 },
            lean: true,
            limit: parseInt(limit, 10) || 10,
            page: parseInt(page, 10) || 1
        }
        let data = User.paginate(query, options)
            .then((data) => {
                return res.sendData(data)
            })
            .catch((err) => {
                return res.sendError(err)
            })
    }
    else res.send({message: 'Cannot get list infor user'})
}

const createUser = (req, res) => {
    const user = req.body

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
            .catch((err) => {
                return res.sendError(err)
            })
    }

}

const updateUser = (req, res) => {
    let id = req.params.id;
    let data = req.body
    let err = validateUserEditApi(data)
    if (err && err.error) {
        let errors = err.error && err.error.details.reduce((result, item) => {
            return {
                ...result,
                [item.path[0]]: item.message
            }
        }, {})
        return res.sendError(errors)
    }
    else {
        if (req.files && req.files.avatar) {
            data.avatar = req.files.avatar[0]
        } else delete data.avatar
        if (data.password && data.password == '') delete data.password
        else
            if (data.password == undefined) delete data.password
            else data.password = bcrypt.hashSync(data.password, 10)
        userService.updateUser(id, data)
            .then(data => {
                res.sendData(data)
            })
            .catch(err => {
                res.sendError(err)
            })

    }
}

const deleteUser = (req, res) => {
    let id = req.params.id
    userService.deleteUser(id)
        .then(data => {
            res.sendData(data)
        })
        .catch(err => {
            res.sendError()
        })
}

const deleteListUser = (req, res) => {
    let ids = req.body._id;
    userService.deleteListUser(ids)
        .then(data => {
            return res.sendData(data);
        }).catch(err => {
            return res.sendError(err)
        });

}

const sendVerifyToken = (req, res) => {
    userService.sendVerifyToken(req.user.user_id._id, req.headers.origin)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError();
        })
}

const getUserToken = (data) => {
    return jwtToken({ _id: data._id, user_id: { role: data.user_id.role, _id: data.user_id._id } });
}

const verifyEmail = (req, res) => {
    userService.verifyEmail(req.query.email, req.query.token)
        .then(entertainerData => {
            res.sendData({
                token: getUserToken(entertainerData)
            });
        })
        .catch(err => {
            res.sendError();
        })
}

const changePassword = (req, res) => {
    let id = req.params.id;
    let oldPass = req.body.old_pass;
    let newPass = req.body.new_pass;
    let newPassRetype = req.body.new_pass_retype;

    userService.changePassword(id, oldPass, newPass, newPassRetype)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError();
        })
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    sendVerifyToken,
    verifyEmail,
    changePassword,
    getAllUser,
    deleteUser,
    deleteListUser
}
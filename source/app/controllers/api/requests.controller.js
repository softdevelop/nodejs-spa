const mongoose = require("mongoose")
const { requestService } = require("../../services");
const moment = require('moment')
const Request = mongoose.model("Request");
const { validateRequest, validateRequestEdit } = require('../../models/requests')
const path = require('path');

const getRequest = (req, res) => {
    let id = req.params.id;
    requestService.getRequest(id)
        .then(data => {
            if (data.user_id == req.user._id || req.user.user.role == 'ADMIN') {
                res.sendData(data);
            }
            else return res.send({ message: 'Cannot get infor Request' })
        })
        .catch(err => {
            res.sendError();
        })
}

const getListRequest = (req, res) => {
    let { page, limit, day, month, year } = req.query
    var query = {}
    if (month && year) {
        const starOfMonth = moment(`${year}-${month}`).startOf('month').toISOString()
        const endOfMonth = moment(`${year}-${month}`).endOf('month').toISOString()
        if (day) {
            const sunday = moment(`${year}-${month}-${day}`).startOf('week').toISOString()
            const saturday = moment(`${year}-${month}-${day}`).endOf('week').toISOString()
            query = {
                datetime_start: { $gte: sunday, $lte: saturday }
            }
        } else {
            query = {
                datetime_start: { $gte: starOfMonth, $lte: endOfMonth }
            }
        }
    }
    if (req.user.user.role !== 'ADMIN') {
        query = {
            ...query, user_id: { $eq: req.user._id }
        }
    }
    var options = {
        select: "",
        sort: { createdAt: -1 },
        lean: true,
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        populate: [{
            path: 'User',
        }]
    }
    Request.paginate(query, options)
        .then(data => {
            return res.sendData(data)
        })
        .catch((err) => {
            return res.sendError(err)
        })
}

const createRequest = (req, res) => {
    const request = { ...req.body, user_id: req.user._id }
    const err = validateRequest(request)

    if (err && err.error) {
        let errors = err.error && err.error.details.reduce((result, item) => {
            return {
                ...result,
                [item.path[0]]: item.message
            }
        }, {})
        return res.sendError(errors)
    } else {
        requestService.createRequest(request)
            .then((data) => {
                return res.sendData(data)
            })
            .catch((err) => {
                return res.sendError(err)
            })
    }
}

const editRequest = (req, res) => {
    let id = req.params.id
    let newdata = { ...req.body, user_id: req.user._id }
    let err = validateRequestEdit(newdata)
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
        requestService.getRequest(id)
            .then(data => {
                if (data.user_id == req.user._id || req.user.user.role == 'ADMIN') {
                    requestService.editRequest(id, newdata)
                        .then(data => {
                            return res.sendData(data)
                        }).catch(err => {
                            return res.sendError(err)
                        })
                } else {
                    return res.send({ message: 'Cannot edit' })
                }
            })
            .catch(err => {
                return res.sendError(err)
            })
    }
}

const deleteRequest = (req, res) => {
    let id = req.params.id
    requestService.getRequest(id)
        .then(data => {
            if (data.user_id == req.user._id || req.user.user.role == 'ADMIN') {
                requestService.deleteRequest(id)
                    .then(data => {
                        res.sendData(data)
                    })
                    .catch(err => {
                        res.sendError(err)
                    })
            } else {
                return res.send({ message: 'Cannot delete' })
            }
        })
        .catch(err => {
            return res.sendError(err)
        })
}

const deleteListRequest = (req, res) => {
    let ids = req.body.ids;
    requestService.getListRequest(ids)
        .then(data => {
            data.forEach(item => {
                if (item.user_id == req.user._id || req.user.user.role == 'ADMIN') {
                    requestService.deleteListRequest(item._id)
                        .then(data => {
                            res.sendData(data)
                        })
                        .catch(err => {
                            res.end(err)
                        })
                }
                else {
                    return res.send({ message: 'Cannot get infor request' })
                }
            })
        })
        .catch(err => {
            return res.sendError(err)
        })
}

module.exports = {
    createRequest,
    editRequest,
    getRequest,
    getListRequest,
    deleteRequest,
    deleteListRequest

}
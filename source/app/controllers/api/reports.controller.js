const mongoose = require("mongoose")
const Report = mongoose.model("Report");
const moment = require('moment');
const { reportService } = require("../../services");
const { validateReport, validateReportEdit } = require('../../models/reports')
const path = require('path');

const getReport = (req, res) => {
    let id = req.params.id;
    reportService.getReport(id)
        .then(data => {
            if (data.user_id == req.user._id || req.user.user.role == 'ADMIN') {
                res.sendData(data);
            }
            else return res.send({ message: 'Cannot get infor report' })
        })
        .catch(err => {
            res.sendError(err);
        })
}

const getListReport = (req, res) => {
    let { page, limit, day, month, year } = req.query
    let query = {}
    if (month && year) {
        const date = `${year}-${month}`
        const startOfMonth = moment(date, 'YYYY-MM').startOf('month').toISOString();
        const endOfMonth = moment(date, 'YYYY-MM').endOf('month').toISOString();
        if (day) {
            const date = `${year}-${month}-${day}`
            const sunday = moment(date, 'YYYY-MM-DD').startOf('week').toISOString();
            const saturday = moment(date, 'YYYY-MM-DD').endOf('week').toISOString();
            query = {
                time_start: { $gte: sunday, $lte: saturday }
            }
        } else {
            query = {
                time_start: { $gte: startOfMonth, $lte: endOfMonth }
            }
        }
    }
    if (req.user.user.role !== 'ADMIN') {
        query = {
            ...query,
            user_id: { $eq: req.user._id },
        }
    }
    const options = {}
    reportService.checkOption(query, options)
        .then((data) => {
            return res.sendData(data)
        })
        .catch((err) => {
            return res.send({ message: 'Cannot get list infor user' })
        })
}

const getMonthInYear = (req, res) => {
    let year = +req.query.year
    let match = {}
    if (req.user.user.role !== 'ADMIN') {
        match = {
            user_id: req.user._id,
        }
        reportService.getListOfMonthInYear(year, match)
            .then(data => {
                res.sendData(data)
            }).catch(err => {
                res.sendError(err)
            });
    }
    else {
        reportService.getListOfMonthInYear(year, match)
            .then(data => {
                res.sendData(data)
            }).catch(err => {
                res.sendError(err)
            });
    }

}

const createReport = (req, res) => {
    const report = { ...req.body, user_id: req.user._id, time_start: new Date() }
    const err = validateReport(report)
    if (err && err.error) {
        let errors = err.error && err.error.details.reduce((result, item) => {
            return {
                ...result,
                [item.path[0]]: item.message
            }
        }, {})
        return res.sendError(errors)
    } else {
        if (report.work_time > 0) {
            const timeWork = report.work_time * 3600 * 1000
            const newTimeStart = Number(report.time_start)
            report.time_end = new Date(newTimeStart + timeWork)
        } else {
            report.time_end = report.time_start
        }
        reportService.createReport(report)
            .then((data) => {
                return res.sendData(data)
            })
            .catch((err) => {
                return res.sendError(err)
            })
    }
}

const editReport = (req, res) => {
    let id = req.params.id
    const report = { ...req.body, user_id: req.user._id, time_start: new Date() }
    let err = validateReportEdit(report)

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
        if (report.work_time > 0) {
            const timeWork = report.work_time * 3600 * 1000
            const newTimeStart = Number(report.time_start)
            report.time_end = new Date(newTimeStart + timeWork)
        } else {
            report.time_end = report.time_start
        }
        reportService.getReport(id)
            .then(data => {
                if (data.user_id == req.user._id || req.user.user.role == 'ADMIN') {
                    reportService.editReport(id, report)
                        .then(data => {
                            res.sendData(data)
                        })
                        .catch(err => {
                            res.sendError(err)
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

const deleteReport = (req, res) => {
    let id = req.params.id
    reportService.getReport(id)
        .then(data => {
            if (data.user_id == req.user._id || req.user.user.role == 'ADMIN') {
                reportService.deleteReport(id)
                    .then(data => {
                        res.sendData(data)
                    })
                    .catch(err => {
                        res.sendError()
                    })
            } else {
                return res.send({ message: 'Cannot delete' })
            }
        })
        .catch(err => {
            return res.sendError(err)
        })
}

const deleteListReport = (req, res) => {
    let ids = req.body.ids
    reportService.getListReport(ids)
        .then(data => {
            data.forEach(item => {
                if (item.user_id == req.user._id || req.user.user.role == 'ADMIN') {
                    reportService.deleteListReport(item._id)
                        .then(data => {
                            res.sendData(data)
                        })
                        .catch(err => {
                            res.end(err)
                        })
                }
                else {
                    return res.send({ message: 'Cannot get infor report' })
                }
            })
        })
        .catch(err => {
            return res.sendError(err)
        })
}




module.exports = {
    createReport,
    editReport,
    getReport,
    getListReport,
    deleteReport,
    deleteListReport,
    getMonthInYear
}
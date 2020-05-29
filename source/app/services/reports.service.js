const mongoose = require("mongoose");
const Report = mongoose.model("Report");

const getReport = (id) => {
    return new Promise((resolve, reject) => {
        Report.findById(id)
            .then(doc => {
                if (doc == null) throw new Error("Report not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}
const getListReport = (ids) => {
    return new Promise((resolve, reject) => {
        Report.find({
            _id: { $in: ids },
        })
            .then(doc => {
                if (doc == null) throw new Error("Report not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}
const createReport = (data) => {
    return new Promise((resolve, reject) => {
        Report.create(data)
            .then(doc => {
                if (doc == null) throw new Error("Insert fail")
                resolve("Create report successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })
}
const editReport = async (id, data) => {
    return new Promise((resolve, reject) => {
        Report.findById(id).update(data)
            .then(doc => {
                if (doc == null) throw new Error('edit fail')
                resolve("edit report successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}

const deleteReport = (id) => {
    return new Promise((resolve, reject) => {
        Report.findByIdAndRemove(id)
            .then(doc => {
                if (doc == null) throw new Error("Delete report unseccessfully")
                resolve("Delete report successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })
}

const deleteListReport = (ids) => {
    return new Promise((resolve, reject) => {
        Report.deleteMany(
            {
                _id: { $in: ids },
            })
            .then(doc => {
                if (doc == null) throw new Error("Delete list report unseccessfully")
                resolve("Delete list report successfully")
            })
            .catch(err => {
                reject(err.message)
            })

    })
}
const getListOfMonthInYear = (year, match) => {
    return new Promise((resolve, reject) => {
        Report.aggregate([
            {
                $match: { match },
            },
            {
                $lookup: {
                    from: 'User',
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'User'
                },
            },
            {
                $project: {
                    work_time: 1,
                    year: { "$year": "$time_start" },
                    time_start: 1
                }
            }, {
                $match: {
                    year
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$time_start" },
                        month: { $month: "$time_start" },
                    },
                    total: { "$sum": "$work_time" }
                }
            }
        ])
            .then(doc => {
                if (doc == null) throw new Error("List report not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}
const checkOption = (query, option) => {
    const options = {
        select: "",
        sort: { createdAt: -1 },
        lean: true,
        limit: 10,
        page: 1,
        populate: [{
            path: 'User',
        }]
    }
    let newOption = { ...options, ...option }
    return new Promise((resolve, reject) => {
        Report.paginate(query, newOption)
            .then(doc => {
                if (doc == null) throw new Error("List report not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}

module.exports = {
    createReport,
    editReport,
    deleteReport,
    deleteListReport,
    getReport,
    getListReport,
    getListOfMonthInYear,
    checkOption
}
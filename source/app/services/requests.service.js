const mongoose = require("mongoose");
const Request = mongoose.model("Request");
const getRequest = (id) => {
    return new Promise((resolve, reject) => {
        Request.findById(id)
            .then(doc => {
                if (doc == null) throw new Error("Request not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}
const getListRequest = (ids) => {
    return new Promise((resolve, reject) => {
        Request.find({
            _id: { $in: ids },
        })
            .then(doc => {
                if (doc == null) throw new Error("Request not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}
const createRequest = (data) => {
    return new Promise((resolve, reject) => {
        Request.create(data)
            .then(doc => {
                if (doc == null) throw new Error("Insert fail")
                resolve("Create request successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })
}
const editRequest = async (id, data) => {
    return new Promise((resolve, reject) => {
        Request.findById(id).update(data)
            .then(doc => {
                if (doc == null) throw new Error('edit fail')
                resolve("edit request successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}
const deleteRequest = (id) => {
    return new Promise((resolve, reject) => {
        Request.findByIdAndRemove(id)
            .then(doc => {
                if (doc == null) throw new Error("Delete request unseccessfully")
                resolve("Delete request successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}
const deleteListRequest = (ids) => {
    return new Promise((resolve, reject) => {
        Request.deleteMany(
            {
                _id: { $in: ids },
            })
            .then(doc => {
                if (doc == null) throw new Error("Delete list request unseccessfully")
                resolve("Delete list request successfully")
            })
            .catch(err => {
                reject(err.message)
            })

    })
}
module.exports = {
    createRequest,
    editRequest,
    getRequest,
    deleteRequest,
    deleteListRequest,
    getListRequest
}
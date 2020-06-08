const mongoose = require("mongoose");
const SpasService = mongoose.model("SpasService");
const getSpasService = (id) => {
    return new Promise((resolve, reject) => {
        SpasService.findById(id)
            .then(doc => {
                if (doc == null) throw new Error("SpasService not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}
const createSpasService = (data) => {
    return new Promise((resolve, reject) => {
        SpasService.create(data)
            .then(doc => {
                if (doc == null) throw new Error("Insert fail")
                resolve("Create project successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })
}
const editSpasService = async (id, data) => {
    return new Promise((resolve, reject) => {
        SpasService.findById(id).update(data)
            .then(doc => {
                if (doc == null) throw new Error('edit fail')
                resolve("edit project successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}
const deleteSpasService = (id) => {
    return new Promise((resolve, reject) => {
        SpasService.findByIdAndRemove(id)
            .then(doc => {
                if (doc == null) throw new Error("Delete project unseccessfully")
                resolve("Delete SpasService successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}
const deleteListSpasService = (ids) => {
    return new Promise((resolve, reject) => {
        SpasService.deleteMany(
            {
                _id: { $in: ids },
            })
            .then(doc => {
                if (doc == null) throw new Error("Delete list project unseccessfully")
                resolve("Delete list SpasService successfully")
            })
            .catch(err => {
                reject(err.message)
            })

    })
}
module.exports = {
    createSpasService,
    editSpasService,
    getSpasService,
    deleteSpasService,
    deleteListSpasService
}
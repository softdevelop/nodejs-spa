const mongoose = require("mongoose");
const SpasTeam = mongoose.model("SpasTeam");
const getSpasTeam = (id) => {
    return new Promise((resolve, reject) => {
        SpasTeam.findById(id)
            .then(doc => {
                if (doc == null) throw new Error("SpasTeam not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}
const createSpasTeam = (data) => {
    return new Promise((resolve, reject) => {
        SpasTeam.create(data)
            .then(doc => {
                if (doc == null) throw new Error("Insert fail")
                resolve("Create project successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })
}
const editSpasTeam = async (id, data) => {
    return new Promise((resolve, reject) => {
        SpasTeam.findById(id).update(data)
            .then(doc => {
                if (doc == null) throw new Error('edit fail')
                resolve("edit project successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}
const deleteSpasTeam = (id) => {
    return new Promise((resolve, reject) => {
        SpasTeam.findByIdAndRemove(id)
            .then(doc => {
                if (doc == null) throw new Error("Delete project unseccessfully")
                resolve("Delete SpasTeam successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}
const deleteListSpasTeam = (ids) => {
    return new Promise((resolve, reject) => {
        SpasTeam.deleteMany(
            {
                _id: { $in: ids },
            })
            .then(doc => {
                if (doc == null) throw new Error("Delete list project unseccessfully")
                resolve("Delete list SpasTeam successfully")
            })
            .catch(err => {
                reject(err.message)
            })

    })
}
module.exports = {
    createSpasTeam,
    editSpasTeam,
    getSpasTeam,
    deleteSpasTeam,
    deleteListSpasTeam
}
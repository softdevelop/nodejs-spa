const mongoose = require("mongoose");
const ExpertsService = mongoose.model("ExpertsService");
const getExpertsService = (id) => {
    return new Promise((resolve, reject) => {
        ExpertsService.findById(id)
            .then(doc => {
                if (doc == null) throw new Error("ExpertsService not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}
const createExpertsService = (data) => {
    return new Promise((resolve, reject) => {
        ExpertsService.create(data)
            .then(doc => {
                if (doc == null) throw new Error("Insert fail")
                resolve("Create project successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })
}
const editExpertsService = async (id, data) => {
    return new Promise((resolve, reject) => {
        ExpertsService.findById(id).updateOne(data)
            .then(doc => {
                if (doc == null) throw new Error('edit fail')
                resolve("edit project successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}
const deleteExpertsService = (id) => {
    return new Promise((resolve, reject) => {
        ExpertsService.findByIdAndRemove(id)
            .then(doc => {
                if (doc == null) throw new Error("Delete project unseccessfully")
                resolve("Delete ExpertsService successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}
const deleteListExpertsService = (ids) => {
    return new Promise((resolve, reject) => {
        ExpertsService.deleteMany(
            {
                _id: { $in: ids },
            })
            .then(doc => {
                if (doc == null) throw new Error("Delete list project unseccessfully")
                resolve("Delete list ExpertsService successfully")
            })
            .catch(err => {
                reject(err.message)
            })

    })
}
module.exports = {
    createExpertsService,
    editExpertsService,
    getExpertsService,
    deleteExpertsService,
    deleteListExpertsService
}
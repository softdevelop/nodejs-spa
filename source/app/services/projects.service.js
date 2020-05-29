const mongoose = require("mongoose");
const Project = mongoose.model("Project");
const getProject = (id) => {
    return new Promise((resolve, reject) => {
        Project.findById(id)
            .then(doc => {
                if (doc == null) throw new Error("Project not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}
const createProject = (data) => {
    return new Promise((resolve, reject) => {
        Project.create(data)
            .then(doc => {
                if (doc == null) throw new Error("Insert fail")
                resolve("Create project successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })
}
const editProject = async (id, data) => {
    return new Promise((resolve, reject) => {
        Project.findById(id).update(data)
            .then(doc => {
                if (doc == null) throw new Error('edit fail')
                resolve("edit project successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}
const deleteProject = (id) => {
    return new Promise((resolve, reject) => {
        Project.findByIdAndRemove(id)
            .then(doc => {
                if (doc == null) throw new Error("Delete project unseccessfully")
                resolve("Delete Project successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}
const deleteListProject = (ids) => {
    return new Promise((resolve, reject) => {
        Project.deleteMany(
            {
                _id: { $in: ids },
            })
            .then(doc => {
                if (doc == null) throw new Error("Delete list project unseccessfully")
                resolve("Delete list Project successfully")
            })
            .catch(err => {
                reject(err.message)
            })

    })
}
module.exports = {
    createProject,
    editProject,
    getProject,
    deleteProject,
    deleteListProject
}
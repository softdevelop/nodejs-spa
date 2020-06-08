const mongoose = require("mongoose");
const SpasIntro = mongoose.model("SpasIntro");
const getSpasIntro = (id) => {
    return new Promise((resolve, reject) => {
        SpasIntro.findById(id)
            .then(doc => {
                if (doc == null) throw new Error("SpasIntro not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}
const createSpasIntro = (data) => {
    return new Promise((resolve, reject) => {
        SpasIntro.create(data)
            .then(doc => {
                if (doc == null) throw new Error("Insert fail")
                resolve("Create project successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })
}
const editSpasIntro = async (id, data) => {
    return new Promise((resolve, reject) => {
        SpasIntro.findById(id).updateOne(data)
            .then(doc => {
                if (doc == null) throw new Error('edit fail')
                resolve("edit project successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}
const deleteSpasIntro = (id) => {
    return new Promise((resolve, reject) => {
        SpasIntro.findByIdAndRemove(id)
            .then(doc => {
                if (doc == null) throw new Error("Delete project unseccessfully")
                resolve("Delete SpasIntro successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}
const deleteListSpasIntro = (ids) => {
    return new Promise((resolve, reject) => {
        SpasIntro.deleteMany(
            {
                _id: { $in: ids },
            })
            .then(doc => {
                if (doc == null) throw new Error("Delete list project unseccessfully")
                resolve("Delete list SpasIntro successfully")
            })
            .catch(err => {
                reject(err.message)
            })

    })
}
module.exports = {
    createSpasIntro,
    editSpasIntro,
    getSpasIntro,
    deleteSpasIntro,
    deleteListSpasIntro
}
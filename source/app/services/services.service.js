const mongoose = require("mongoose");
const Service = mongoose.model("Service");
const getService = (id) => {
    return new Promise((resolve, reject) => {
        Service.findById(id)
            .then(doc => {
                if (doc == null) throw new Error("Service not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}
const createService = (data) => {
    return new Promise((resolve, reject) => {
        Service.create(data)
            .then(doc => {
              console.log('####doc', doc);
                if (doc == null) throw new Error("Insert fail")
                resolve(doc)
            })
            .catch(err => {
              console.log('####then-doc', err);

                reject(err.message)
            })
    })
}
const editService = async (id, data) => {
    return new Promise((resolve, reject) => {
        Service.findById(id).updateOne(data)
            .then(doc => {
                if (doc == null) throw new Error('edit fail')
                resolve("edit project successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}
const deleteService = (id) => {
    return new Promise((resolve, reject) => {
        Service.findByIdAndRemove(id)
            .then(doc => {
                if (doc == null) throw new Error("Delete project unseccessfully")
                resolve("Delete Service successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}
const deleteListService = (ids) => {
    return new Promise((resolve, reject) => {
        Service.deleteMany(
            {
                _id: { $in: ids },
            })
            .then(doc => {
                if (doc == null) throw new Error("Delete list project unseccessfully")
                resolve("Delete list Service successfully")
            })
            .catch(err => {
                reject(err.message)
            })

    })
}
module.exports = {
    createService,
    editService,
    getService,
    deleteService,
    deleteListService
}
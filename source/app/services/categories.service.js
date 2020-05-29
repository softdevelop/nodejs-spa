const mongoose = require("mongoose");
const Category = mongoose.model("Category");

const getCategory = (id) => {
    return new Promise((resolve, reject) => {
        Category.findById(id)
            .then(doc => {
                if (doc == null) throw new Error("Category not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}
const getListCategory = ({ }) => {
    return new Promise((resolve, reject) => {
        Category.find({})
            .then(doc => {
                if (doc == null) throw new Error("Category not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}
const createCategory = (data) => {
    return new Promise((resolve, reject) => {
        Category.create(data)
            .then(doc => {
                if (doc == null) throw new Error("Insert fail")
                resolve("Create Category successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })
}
const editCategory = async (id, data) => {
    return new Promise((resolve, reject) => {
        Category.findById(id).update(data)
            .then(doc => {
                if (doc == null) throw new Error('edit fail')
                resolve("edit category successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}
const deleteCategory = (id) => {
    return new Promise((resolve, reject) => {
        Category.findByIdAndRemove(id)
            .then(doc => {
                if (doc == null) throw new Error("Delete category unseccessfully")
                resolve("Delete category successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}
const deleteListCategory = (ids) => {
    return new Promise((resolve, reject) => {
        Category.deleteMany(
            {
                _id: { $in: ids },
            })
            .then(doc => {
                if (doc == null) throw new Error("Delete list category unseccessfully")
                resolve("Delete list category successfully")
            })
            .catch(err => {
                reject(err.message)
            })

    })
}
module.exports = {
    createCategory,
    editCategory,
    deleteCategory,
    deleteListCategory,
    getCategory,
    getListCategory
}
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { ObjectId } = require('mongodb');

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id)
            .select("-password")
            .then(doc => {
                if (doc == null) throw new Error("User not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}
const getUser2 = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id)
            .then(doc => {
                if (doc == null) throw new Error("User not found");
                resolve(doc);
            })
            .catch(err => {
                reject(err);
            })
    })
}
const create = (data) => {
    return new Promise((resolve, reject) => {
        User.create(data)
            .then(doc => {
                if (doc == null) throw new Error("insert fail");
                resolve("Created user successfully")
            })
            .catch(err => {
                reject(err.message);
            })
    })
}

const updateUser = async (id, data) => {
  return new Promise((resolve, reject) => {
      User.findById(ObjectId(id)).update(data)
          .then(doc => {
              if (doc == null) throw new Error('Update fail')
              resolve("Update user successfully")
          })
          .catch(err => {
              reject(err.message)
          })
  })

}
const changePassword = (id, newPass) => {
    return new Promise((resolve, reject) => {
        User.findById(id).update({ password: newPass })
            .then(doc => {
                if (doc == null) throw new Error("changes password unseccessfully");
                resolve("changes password successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })
}
const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndRemove(id)
            .then(doc => {
                if (doc == null) throw new Error("Delete user unseccessfully")
                resolve("Delete user successfully")
            })
            .catch(err => {
                reject(err.message)
            })
    })

}
const deleteListUser = (ids) => {
    return new Promise((resolve, reject) => {
        User.deleteMany(
            {
                _id: { $in: ids },
            })
            .then(doc => {
                if (doc == null) throw new Error("Delete list user unseccessfully")
                resolve("Delete list user successfully")
            })
            .catch(err => {
                reject(err.message)
            })

    })
}
module.exports = {
    getUser,
    create,
    changePassword,
    getUser2,
    updateUser,
    deleteUser,
    deleteListUser
}
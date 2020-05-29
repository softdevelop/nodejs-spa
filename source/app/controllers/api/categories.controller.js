const mongoose = require("mongoose")

const { categoryService } = require("../../services");
const { validateCategory, Categories, validateCategoryEdit } = require('../../models/categories')
const path = require('path');

const getCategory = (req, res) => {
    let id = req.params.id;
    categoryService.getCategory(id)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err);
        })
}

const getListCategory = (req, res) => {
    categoryService.getListCategory({})
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError();
        })
}
const createCategory = (req, res) => {
    const category = req.body
    const err = validateCategory(category)

    if (err && err.error) {
        let errors = err.error && err.error.details.reduce((result, item) => {
            return {
                ...result,
                [item.path[0]]: item.message
            }
        }, {})
        return res.sendError(errors)
    } else {
        if (req.files && req.files.img) {
            category.img = req.files.img[0]
        }
        categoryService.createCategory(category)
            .then((data) => {
                return res.sendData(data)
            })
            .catch((err) => {
                return res.sendError(err)
            })
    }
}

const editCategory = (req, res) => {
    let id = req.params.id
    let data = req.body
    let err = validateCategoryEdit(data)

    if (err && err.error) {
        let errors = err.error && err.error.details.reduce((result, item) => {
            return {
                ...result,
                [item.path[0]]: item.message
            }
        }, {})
        return res.sendError(errors)
    }
    else {
        if (req.files && req.files.img) {
            data.img = req.files.img[0]
        } else delete data.img
        categoryService.editCategory(id, data)
            .then(data => {
                res.sendData(data)
            })
            .catch(err => {
                res.sendError(err)
            })
    }
}

const deleteCategory = (req, res) => {
    let id = req.params.id
    categoryService.deleteCategory(id)
        .then(data => {
            res.sendData(data)
        })
        .catch(err => {
            res.sendError(err)
        })
}

const deleteListCategory = (req, res) => {
    let ids = req.body.ids;
    categoryService.deleteListCategory(ids)
        .then(data => {
            return res.sendData(data);
        }).catch(err => {
            return res.sendError(err)
        });

}
module.exports = {
    createCategory,
    editCategory,
    deleteCategory,
    deleteListCategory,
    getCategory,
    getListCategory
}
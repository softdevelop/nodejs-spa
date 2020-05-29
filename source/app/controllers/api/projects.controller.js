const mongoose = require("mongoose")
const { projectService } = require("../../services");
const Project = mongoose.model("Project");
const { validateProject, validateProjectEdit } = require('../../models/projects')
const path = require('path');

const getProject = (req, res) => {
    let id = req.params.id;
    projectService.getProject(id)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError();
        })
}
const getListProject = (req, res) => {

    let { page, limit } = req.query
    var query = {}

    var options = {
        select: "",
        sort: { createdAt: -1 },
        lean: true,
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1
    }
    let data = Project.paginate(query, options)
        .then((data) => {
            return res.sendData(data)
        })
        .catch((err) => {
            return res.send({ message: 'Cannot get list infor project' })
        })

}
const createProject = (req, res) => {
    const project = { ...req.body, createdBy: req.user._id }
    const err = validateProject(project)

    if (err && err.error) {
        let errors = err.error && err.error.details.reduce((result, item) => {
            return {
                ...result,
                [item.path[0]]: item.message
            }
        }, {})
        return res.sendError(errors)
    } else {
        if (req.files && req.files.imgs) {
            project.imgs = req.files.imgs[0]
        }
        projectService.createProject(project)
            .then((data) => {
                return res.sendData(data)
            })
            .catch((err) => {
                return res.sendError(err)
            })
    }
}

const editProject = (req, res) => {
    let id = req.params.id
    let data = { ...req.body, createdBy: req.user._id }
    let err = validateProjectEdit(data)
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
        if (req.files && req.files.imgs) {
            data.imgs = req.files.imgs[0]
        } else delete data.imgs
        projectService.editProject(id, data)
            .then(data => {
                res.sendData(data)
            })
            .catch(err => {
                res.sendError(err)
            })
    }
}

const deleteProject = (req, res) => {
    let id = req.params.id
    projectService.deleteProject(id)
        .then(data => {
            res.sendData(data)
        })
        .catch(err => {
            res.sendError(err)
        })
}

const deleteListProject = (req, res) => {
    let ids = req.body.ids;
    projectService.deleteListProject(ids)
        .then(data => {
            return res.sendData(data);
        }).catch(err => {
            return res.sendError(err)
        });

}
module.exports = {
    createProject,
    editProject,
    getProject,
    getListProject,
    deleteProject,
    deleteListProject

}
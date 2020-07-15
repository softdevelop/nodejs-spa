const mongoose = require("mongoose");
const Spa = mongoose.model("Spa");
const User = mongoose.model("User");
const SpaService = mongoose.model("SpasService")
const moment = require("moment-timezone");
const { genHtmlPagination, urlMediaUpload } = require('../../utils')
const { validateSpa, validateSpaEdit, validateSpaEditOfSpa } = require('../../models/spas')
const { validateSpaService, validateSpaServiceEdit } = require('../../models/spas_services')
const bcrypt = require("bcryptjs");
var ObjectId = require('mongodb').ObjectID;
const { locations } = require("../../utils/constants");
const Service = mongoose.model('Service')
const truncate = require('html-truncate');
const { dataProvince, dataDistrict } = require("../../utils/location");
const fs = require('fs')

const {
    spaIntroService,
    spaServiceService,
    spaTeamService,
    serviceService,
} = require("../../services");

const APP_DOMAIN = require("../../../config/index").APP_DOMAIN;
const dashboardUrl = () => APP_DOMAIN + `/dashboard`;
mongoose.Promise = global.Promise;

const getListSpas = async(req, res) => {
    if (req.user) {
        let { page, limit } = req.query;
        let search = req.query.search || '';
        let text = '.*' + search.split(' ').join('.*') + '.*'
        let reg = new RegExp(text);
        var query = {
            name: { $regex: reg, $options: 'gmi' },
            description: { $regex: reg, $options: 'gmi' }
        };
        var options = {
            select: "", //"username email"
            sort: { createdAt: -1 },
            lean: true,
            limit: parseInt(limit, 10) || 10,
            page: parseInt(page, 10) || 1,
            populate: "ownerDetail",

        };
        let data = await Spa.paginate(query, options);

        data.search = search
        return res.render("admin/spas/index", {
            data,
            urlMediaUpload,
            moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
            genHtmlPagination: genHtmlPagination(data.total, data.limit, data.page, data.pages, data.search),
        });
    } else {}
};

const getFormCreate = async(req, res) => {
    let usersOwnedSpa = await Spa.find({ owner: { $ne: null } }).select('_id name owner').exec();
    let idsUsersOwnedSpa = usersOwnedSpa.map(item => '' + item.owner);
    let spaOwners = await User.find({ role: "SPA_OWNER", _id: { $nin: idsUsersOwnedSpa } }).exec();
    res.render('admin/spas/create', { errors: {}, data: {}, spaOwners, locations, dataProvince, dataDistrict })
}

const create = async(req, res) => {
    console.log('aaaaa')
    let data = req.body
    let err = validateSpa(data)
    if (err && err.error) {
        console.log('bbb')
        let errors = err.error && err.error.details.reduce((result, item) => {
            return {
                ...result,
                [item.path[0]]: item.message
            }
        }, {})
        return res.sendError({ errors, data })
    } else {
        if (req.files.logo) {
            data.logo = req.files.logo[0]
        }
        if (req.files.imgs) {
            data.imgs = req.files.imgs
        }
        let newSpa = new Spa(data)
        newSpa.save().then((e) => {
            return res.sendData({ status: 'Success' })
        }).catch(e => {
            return res.sendError({ errors: { name: 'The value is duplicated.', slug: 'The value is duplicated.' } })
        })
    }
}

const getFormEdit = async(req, res) => {
    let id = req.params.id
    let record = await Spa.findById(id).exec();
    let usersOwnedSpa = await Spa.find({ owner: { $ne: null } }).select('owner name').exec();
    let idsUsersOwnedSpa = [];
    usersOwnedSpa.forEach(item => {
        if ('' + item.owner === record.owner + '') {} else {
            idsUsersOwnedSpa.push('' + item.owner)
        }
    });
    let spaOwners = await User.find({ role: "SPA_OWNER", _id: { $nin: idsUsersOwnedSpa } }).exec();
    res.render('admin/spas/edit', { errors: {}, data: record, urlMediaUpload, spaOwners, locations, dataProvince, dataDistrict })
}

const edit = async(req, res) => {
    let id = req.params.id
    let data = req.body
    delete data.logo
    delete data.imgs
    let err = validateSpaEdit(data)
    if (err && err.error) {
        let errors = err.error && err.error.details.reduce((result, item) => {
            return {
                ...result,
                [item.path[0]]: item.message
            }
        }, {})
        data._id = id
        return res.sendError({ errors, data })
    } else {
        if (req.files.logo && req.files.logo[0]) {
            data.logo = req.files.logo[0]
        } else delete data.logo

        if (req.files.imgs) {
            let record = await Spa.findById(id).select('imgs').exec();
            let path;
            record.imgs.forEach(img => {
                path = 'assets/uploads/' + img.filename
                fs.unlink(path, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    //file removed
                })
                console.log('true')
            })
            data.imgs = req.files.imgs
        } else delete data.imgs
        await Spa.findById(id).update(data);
        return res.sendData({ status: 'Success' })
    }
}

const delMany = async(req, res) => {
    try {
        let ids = req.body.ids;
        ids.map(async val => {
            const user = await Spa.deleteOne({ _id: val }, (err, result) => {
                if (err) return res.status(400).json({ status: "error" });
            }).exec();
        });
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(400).json({ success: false });
    }
};

const viewDetail = async(req, res) => {
    let id = req.params.id
    let record = await Spa.findById(id).exec();
    let usersOwnedSpa = await Spa.find({ owner: { $ne: null } }).select('_id name').exec();
    let idsUsersOwnedSpa = usersOwnedSpa.map(item => '' + item._id);
    let spaOwners = await User.find({ role: "SPA_OWNER", _id: { $nin: idsUsersOwnedSpa } }).exec();
    res.render('admin/spas/view', { errors: {}, data: record, urlMediaUpload, spaOwners, })
}

const landingPage = async(req, res) => {
    try {
        let user = await User.findById(req.user._id).populate('spa').exec();
        let spa = user.spa;
        let spaLandingData = await Spa.findById(spa._id).populate('intros').populate({
            path: 'services',
            populate: {
                path: 'service'
            }
        }).populate('members').exec();
        let services = await Service.find({
            $or: [
                { status: 'active' },
                { spa_id_recommend: spa._id }
            ]
        }).exec();

        res.render('admin/spas/landing-page', {
            discount: '',
            spaLandingData,
            urlMediaUpload,
            services,
            servicesJSON: JSON.stringify(services).replace(/\\"/g, '\\\\"'),
            spaLandingDataJSON: JSON.stringify(spaLandingData).replace(/\\"/g, '\\\\"'),
        })
    } catch (e) {
        res.render('admin/404_user_not_owner_spa')
    }
}

const setTemplate = async(req, res) => {
    let user = await User.findById(req.user._id).populate('spa').exec();
    let spa = user.spa;
    let data = req.body
    let files = req.files;
    let fileObj = await files.reduce((result, item) => {
        return {
            ...result,
            [item.fieldname]: item
        }
    }, {})

    if (data.delete) {
        let deleteIntros = data.delete.intros
        deleteIntros && await spaIntroService.deleteListSpasIntro(deleteIntros)
        let deleteServices = data.delete.services
        deleteServices && await spaServiceService.deleteListSpasService(deleteServices)
        let deleteMembers = data.delete.members
        deleteMembers && await spaTeamService.deleteListSpasTeam(deleteMembers)
        delete data.delete
    }

    await data.intros && data.intros.forEach(async item => {
        if (item.id) {
            item.image = fileObj[item.id];
            if (!item.image) delete item.image
            await spaIntroService.editSpasIntro(item.id, item)
        } else {
            item.spa_id = spa._id
            item.image = fileObj[item.image]
            await spaIntroService.createSpasIntro(item);
        }
    })

    await data.services && data.services.forEach(async item => {
        if (item.id) {
            item.image = fileObj[item.id];
            if (!item.image) delete item.image
            if (item.service_id) {
                let service = await Service.findById(item.service_id).exec();
                if (item.title == service.title) delete item.title;
                if (item.content == service.content) delete item.content;
                if (item.image == service.image) delete item.image;
                spaServiceService.editSpasService(item.id, item)
            } else await spaServiceService.editSpasService(item.id, item)
        } else {
            item.spa_id = spa._id
            item.image = fileObj[item.image]
            if (item.service_id) {
                let service = await Service.findById(item.service_id).exec();
                if (item.title == service.title) delete item.title;
                if (item.content == service.content) delete item.content;
                if (item.image == service.image) delete item.image;
                await spaServiceService.createSpasService(item);

            } else {
                item.spa_id_recommend = spa._id
                let service = await serviceService.createService(item);
                let spaService = {
                    price: item.price,
                    service_id: service._id,
                    spa_id: item.spa_id
                }
                await spaServiceService.createSpasService(spaService);
            }

        }
    })

    await data.members && data.members.forEach(async item => {
        if (item.id) {
            item.avatar = fileObj[item.id];
            if (!item.avatar) delete item.avatar
            await spaTeamService.editSpasTeam(item.id, item)
        } else {
            item.spa_id = spa._id
            item.avatar = fileObj[item.avatar]
            await spaTeamService.createSpasTeam(item);
        }
    })

    await Spa.findById(spa._id).updateOne({
        working_hour: data.workingHour,
        template_id: data.templateId,
        description: data.description
    })

    res.sendData('Success')

}

const getTemplatePreview = async(req, res) => {
    let user = await User.findById(req.user._id).populate('spa').exec();
    let spa = user.spa;
    let spaDetail = await Spa.findById(spa._id).populate('intros').populate({
        path: 'services',
        populate: {
            path: 'service'
        }
    }).populate('members').exec();
    let template_id = spaDetail.template_id;
    res.render("template/" + template_id, {
        discount: '',
        spaDetail,
        urlMediaUpload,
        truncate
    });
}

const getTemplateId = async(req, res) => {
    let user = await User.findById(req.user._id).populate('spa').exec();
    let spa = user.spa;
    let spaDetail = await Spa.findById(spa._id).populate('intros').populate({
        path: 'services',
        populate: {
            path: 'service'
        }
    }).populate('members').exec();
    let template_id = spaDetail.template_id;
    res.render('template/' + req.params.id, {
        spaDetail,
        urlMediaUpload,
        truncate
    })
}

const getTemplateExampleId = async(req, res) => {
    res.render('template/' + req.params.id + '_example')
}

const getListService = async(req, res) => {
    let id = req.params.id
    let record = await Spa.findById(id).exec();
    let data = await SpaService.find({ spa_id: id }).populate('service').exec();
    res.render('admin/spas/service/index', { errors: {}, data, record, urlMediaUpload })
}

const getFormCreateService = async(req, res) => {
    let id = req.params.id
    let record = await Spa.findById(id).exec();
    let services = await Service.find({ status: 'active' }).exec();
    let spaOwners = await User.find({ role: "SPA_OWNER" }).exec();
    res.render('admin/spas/service/create', {
        errors: {},
        data: {},
        record,
        spaOwners,
        services,
        servicesJSON: JSON.stringify(services).replace(/\\"/g, '\\\\"')
    })
}

const createService = async(req, res) => {
    let id = req.params.id
    let record = await Spa.findById(id).exec();
    let spa_id = record._id
    let data = {...req.body, spa_id };
    let services = await Service.find({ status: 'active' }).exec();

    if (data.service_id && data.service_id != '0') {
        let service = await Service.findById(data.service_id).exec();
        if (data.title == service.title) delete data.title;
        if (data.content == service.content) delete data.content;
        if (data.image == service.image) delete data.image;
        await spaServiceService.createSpasService(data);
        res.redirect('/admin/spas/' + req.params.id + '/service/index');

    } else {
        delete data.service_id;
        let err = validateSpaService(data);
        if (err && err.error) {
            let errors =
                err.error &&
                err.error.details.reduce((result, item) => {
                    return {
                        ...result,
                        [item.path[0]]: item.message,
                    };
                }, {});
            return res.render("admin/spas/service/create", {
                errors,
                record,
                data,
                services,
                servicesJSON: JSON.stringify(services).replace(/\\"/g, '\\\\"')
            });
        } else {
            try {
                if (req.files.image) {
                    data.image = req.files.image[0]
                }
                let service = await serviceService.createService({...data, status: 'pending' });
                let spaService = {
                    price: data.price,
                    service_id: service._id,
                    spa_id: data.spa_id
                }
                await spaServiceService.createSpasService(spaService);
                res.redirect('/admin/spas/' + req.params.id + '/service/index');
            } catch (e) {
                console.log('e', e);
            }
        }
    }

};

const getFormEditService = async(req, res) => {
    let id = req.params.id
    let services = await Service.find().exec();
    let idSpaService = req.params.idSpaService
    let record = await Spa.findById(id).exec();
    let spaService = await SpaService.findById(idSpaService).populate('service').exec();
    let spaOwners = await User.find({ role: "SPA_OWNER" }).exec();
    res.render('admin/spas/service/edit', {
        errors: {},
        data: record,
        spaService,
        urlMediaUpload,
        spaOwners,
        services,
        servicesJSON: JSON.stringify(services).replace(/\\"/g, '\\\\"')
    })
}
const editService = async(req, res) => {
    let id = req.params.id
    let services = await Service.find().exec();
    let record = await Spa.findById(id).exec();
    let spa_id = record._id
    let idSpaService = req.params.idSpaService
    let spaService = await SpaService.findById(idSpaService).populate('service').exec();
    let data = {...req.body, spa_id }
    delete data.image

    if (data.service_id && data.service_id != '0') {
        if (req.files.image && req.files.image[0]) {
            data.image = req.files.image[0]
        } else delete data.image

        let service = await Service.findById(data.service_id).exec();
        if ('' + spaService.service_id == data.service_id + '') {
            if (data.title == service.title) data.title = null;
            if (data.content == service.content) data.content = null;
            if (data.image == service.image) data.image = null;
        } else {
            if (data.title == service.title) delete data.title;
            if (data.content == service.content) delete data.content;
            if (data.image == service.image) delete data.image;
        }
        await spaServiceService.editSpasService(idSpaService, data);
        res.redirect('/admin/spas/' + req.params.id + '/service/index');

    } else {
        delete data.service_id;
        let err = validateSpaServiceEdit(data)
        if (err && err.error) {
            let errors = err.error && err.error.details.reduce((result, item) => {
                return {
                    ...result,
                    [item.path[0]]: item.message
                }
            }, {})
            data._id = id
            return res.render('admin/spas/service/edit', {
                errors: {},
                data,
                record,
                spaService,
                urlMediaUpload,
                services,
                servicesJSON: JSON.stringify(services).replace(/\\"/g, '\\\\"')
            })
        } else {

            try {
                if (req.files.image) {
                    data.image = req.files.image[0]
                }
                let service = await serviceService.createService({...data, status: 'pending' });
                let spaService = {
                    price: data.price,
                    service_id: service._id,
                    spa_id: data.spa_id
                }
                await spaServiceService.createSpasService(spaService);
                res.redirect('/admin/spas/' + req.params.id + '/service/index');
            } catch (e) {
                console.log('e', e);
            }
        }
    }
}

const delManyService = async(req, res) => {
    try {
        let ids = req.body.ids;
        ids.map(async val => {
            const user = await SpaService.deleteOne({ _id: val }, (err, result) => {
                if (err) return res.status(400).json({ status: "error" });
            }).exec();
        });
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(400).json({ success: false });
    }
}

const viewDetailService = async(req, res) => {
    let id = req.params.id
    let record = await Spa.findById(id).exec();
    let idSpaService = req.params.idSpaService
    let spaService = await SpaService.findById(idSpaService).populate('spas').populate('service').exec();
    res.render('admin/spas/service/view', { errors: {}, data: record, spaService, urlMediaUpload })
}

const getFormUpdateInfor = async(req, res) => {
    let id = req.user._id
    let record = await Spa.findOne({ owner: id }).populate('ownerDetail').exec();
    let usersOwnedSpa = await Spa.find({ owner: { $ne: null } }).select('owner name').exec();
    let idsUsersOwnedSpa = [];
    usersOwnedSpa.forEach(item => {
        if ('' + item.owner === record.owner + '') {} else {
            idsUsersOwnedSpa.push('' + item.owner)
        }
    });
    let spaOwners = await User.find({ role: "SPA_OWNER", _id: { $nin: idsUsersOwnedSpa } }).exec();
    res.render('admin/spas/update-info', { errors: {}, data: record, urlMediaUpload, spaOwners, locations })
}

const updateInfor = async(req, res) => {
    let id = req.user._id
    let data = req.body
    delete data.logo
    delete data.imgs
    let err = validateSpaEditOfSpa(data)
    if (err && err.error) {
        let errors = err.error && err.error.details.reduce((result, item) => {
            return {
                ...result,
                [item.path[0]]: item.message
            }
        }, {})
        data._id = id
        return res.render("admin/spas/update-info", { errors, data, locations, urlMediaUpload });
    } else {
        if (req.files.logo && req.files.logo[0]) {
            data.logo = req.files.logo[0]
        } else delete data.logo

        if (req.files.imgs && req.files.imgs[0]) {
            data.imgs = req.files.imgs[0]
        } else delete data.imgs
        await Spa.findOne({ owner: id }).populate('ownerDetail').update(data);
        res.redirect("/admin");
    }
}

module.exports = {
    getListSpas,
    getFormCreate,
    create,
    getFormEdit,
    edit,
    delMany,
    viewDetail,
    landingPage,
    setTemplate,
    getTemplatePreview,
    getTemplateId,
    getTemplateExampleId,
    getFormCreateService,
    createService,
    getListService,
    getFormEditService,
    editService,
    delManyService,
    viewDetailService,
    getFormUpdateInfor,
    updateInfor
};
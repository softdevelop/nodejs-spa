const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const moment = require("moment-timezone");
const {
    genHtmlPagination,
    genCategory,
    urlMediaUpload,
} = require("../../utils");
const {
    validateCategory,
    validateCategoryEdit,
} = require("../../models/categories");
const bcrypt = require("bcryptjs");

const APP_DOMAIN = require("../../../config/index").APP_DOMAIN;
const dashboardUrl = () => APP_DOMAIN + `/dashboard`;
mongoose.Promise = global.Promise;

const index = async(req, res) => {
    // const europe = new Category({slug: Math.random(), name: 'europe'});
    // const sweden = new Category({slug: Math.random(), name: 'sweden', parent: europe});
    // const stockholm = new Category({slug: Math.random(), name: 'stockholm', parent: sweden});
    // const stockholm2 = new Category({slug: Math.random(), name: 'stockholm2', parent: sweden});
    // const stockholm21 = new Category({slug: Math.random(), name: 'stockholm21', parent: stockholm2});
    // await europe.save();
    // await sweden.save();
    // await stockholm.save();
    // await stockholm2.save();
    // await stockholm21.save()
    // let europe = await Category.findOne({ name: "europe" }).exec();

    let tree = await Category.getChildrenTree({
        fields: "_id name slug parent path",
        options: { lean: true },
    });

    let data = genCategory.genCategoryTree(tree);

    res.render("admin/categories/index", { data });
};

const getListCategories = async(req, res) => {
    if (req.user) {
        let { page, limit } = req.query;
        let search = req.query.search || "";
        let text = ".*" + search.split(" ").join(".*") + ".*";
        let reg = new RegExp(text);
        var query = {
            name: { $regex: reg, $options: "gmi" },
            description: { $regex: reg, $options: "gmi" },
        };
        var options = {
            select: "", //"username email"
            sort: { createdAt: -1 },
            lean: true,
            limit: parseInt(limit, 10) || 10,
            page: parseInt(page, 10) || 1,
        };
        let data = await Category.paginate(query, options);
        data.search = search;
        return res.render("admin/categories/index", {
            data,
            urlMediaUpload,
            moment: moment.tz.setDefault("Asia/Ho_Chi_Minh"),
            genHtmlPagination: genHtmlPagination(
                data.total,
                data.limit,
                data.page,
                data.pages,
                data.search
            ),
        });
    } else {}
};

const getFormCreate = async(req, res) => {
    let categories = await Category.getChildrenTree({
        fields: "_id name slug parent path",
        options: { lean: true },
    });
    let optionsHtml = genCategory.genOptions(categories);
    res.render("admin/categories/create", { errors: {}, data: {}, optionsHtml });
};

const create = async(req, res) => {
    let data = req.body;
    let err = validateCategory(data);
    let categories = await Category.getChildrenTree({
        fields: "_id name slug parent path",
        options: { lean: true },
    });
    if (data.parent === "") delete data.parent;

    let optionsHtml = genCategory.genOptions(categories);

    if (err && err.error) {
        let errors =
            err.error &&
            err.error.details.reduce((result, item) => {
                return {
                    ...result,
                    [item.path[0]]: item.message,
                };
            }, {});
        return res.render("admin/categories/create", { errors, data, optionsHtml });
    } else {
        let newCategory = new Category(data);
        newCategory
            .save()
            .then((e) => {
                res.redirect("/admin/categories");
            })
            .catch((e) => {
                return res.render("admin/categories/create", {
                    errors: {
                        name: "The value is duplicated.",
                        slug: "The value is duplicated.",
                    },
                    data,
                    optionsHtml,
                });
            });
    }
};

const getFormEdit = async(req, res) => {
    let slug = req.params.slug;
    let record = await Category.findOne({ slug }).exec();
    let categories = await Category.getChildrenTree({
        fields: "_id name slug parent path",
        options: { lean: true },
    });

    let allChildren = await record.getAllChildren().exec();
    allChildrenId = await allChildren.map((item) => "" + item._id);
    await allChildrenId.push("" + record._id);
    let optionsHtml = genCategory.genOptions(
        categories,
        "",
        record.parent,
        allChildrenId
    );

    res.render("admin/categories/edit", {
        errors: {},
        data: record,
        urlMediaUpload,
        optionsHtml,
    });
};

const edit = async(req, res) => {
    let id = req.params.id;
    let data = req.body;

    let err = validateCategoryEdit(data);
    if (err && err.error) {
        let errors =
            err.error &&
            err.error.details.reduce((result, item) => {
                return {
                    ...result,
                    [item.path[0]]: item.message,
                };
            }, {});
        data._id = id;
        return res.render("admin/categories/edit", { errors, data, optionsHtml });
    } else {
        if (data.parent !== '') {
            let parent = await Category.findById(data.parent).exec();
            data.path = `${parent.path}#${id}`;
            let record = await Category.findById(id).exec();
            let children = await record.getAllChildren();
            children.forEach(async item => {
                let regex = new RegExp(`^${record.path}`, 'g');
                let newPath = item.path.replace(regex, data.path)
                await Category.findOneAndUpdate({ _id: item._id }, { path: newPath })
            })
        } else {
            delete data.parent
        }

        await Category.findById(id).update(data);
        res.redirect("/admin/categories");
    }
};

del = async(req, res) => {
    try {
        let id = req.body.id;
        let currentItem = await Category.findById(id).exec();
        let children = await currentItem.getAllChildren();
        if (children.length === 0) {
            await Category.deleteOne({ _id: id }, (err, result) => {
                if (err) return res.status(400).json({ status: "error" });
            }).exec();
            return res.status(200).json({ success: true });
        } else {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Cannot delete category has sub-category",
                });
        }
    } catch (err) {
        return res.status(400).json({ success: false });
    }
};

const viewDetail = async(req, res) => {
    let id = req.params.id;
    let record = await Category.findById(id).exec();
    res.render("admin/categories/view", {
        errors: {},
        data: record,
        urlMediaUpload,
    });
};

module.exports = {
    index,
    getListCategories,
    getFormCreate,
    create,
    getFormEdit,
    edit,
    del,
    viewDetail,
}
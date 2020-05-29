const fs = require("fs")
const config = require("../../config");
const pdf2base64 = require('pdf-to-base64');

const deleteFilesUploaded = (filenames) => {
    return Promise.all(
        filenames.map(filename => new Promise((rs, rj) => {
            fs.unlink(`${config.PATH_ASSETS}/uploads/${filename}`, err => rs());
            fs.unlink(`${config.PATH_ASSETS}/uploads-origin/${filename}`, err => rs());
            rs();
        }))
    )
}

const deleteOneFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.unlink(`${config.PATH_ASSETS}/uploads/${filename}`, err => resolve())
        fs.unlink(`${config.PATH_ASSETS}/uploads-origin/${filename}`, err => resolve())
        resolve();
    })
}

module.exports = {
    deleteOneFile,
    deleteFilesUploaded,
}
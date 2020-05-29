'use strict';

/*
 * PSCD - nodejs-mongoose-socket.io-ejs
 * Copyright(c) 2018 <PSCD>
 * MIT Licensed
 */

/**
 * Module dependencies
 */

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const compression = require("compression")

const Analytics = require('analytics-node');
const analytics = new Analytics('iE9O908PhBtU5xOrffcsnSMk12NcfanS');


app.locals.moment = require('moment');
require('events').EventEmitter.defaultMaxListeners = 15;
// Boostrap models
require(config.PATH_MODELS).map(modelName => `${config.PATH_MODELS}/${modelName}`).forEach(name => {
    require(name)
});

const socket = require("./app/socket");

const port = process.env.PORT || 3002;

const RSA = require('./app/utils/rsa')

const getPassphase = () => {
    const text = process.argv.find(
        argName => /^passphase=.+$/.test(argName)
    )
    return text ? text.split("=")[1] : ""
}

const askPassphase = () => new Promise((resolve) => {
    if (process.env.NODE_ENV === 'production') {
        resolve(getPassphase())
    } else {
        resolve('123123')
    }
})

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }
    // fallback to standard filter function
    return compression.filter(req, res)
}

const runApp = (passphrase) => {
    process.env.PASS_PHRASE = passphrase;

    app.use(compression({ filter: shouldCompress }))
    // Boostrap routes
    app.use(cors());
    app.engine('ejs', require('express-ejs-extend'));
    require("./config/express")(app);

    const listen = () => new Promise((resolve, reject) => {
        http.listen(port, () => {
            console.log(`App is listening on port: ${port}, ${process.env.NODE_ENV}`);
            resolve();
        });
    })

    const runJobs = () => {
        return new Promise((resolve, reject) => {
            try {
                jobs.map(job => job().start())
                resolve(jobs)
            } catch (err) {
                reject(err)
            }
        })
    }

    const connect = () => new Promise((resolve, reject) => {
        mongoose.set('useCreateIndex', true);
        mongoose.connect(config.MONGOOSE_DB_URL, { useNewUrlParser: true });
        const db = mongoose.connection;
        db.on('error', () => reject('Please install and start your mongodb'));
        db.once('open', resolve);
    })

    connect()
        .then(() => {
            socket(io);
        })
        .then(listen)
        .catch(er => {
            console.log(er);
            process.exit(1);
        });
}

askPassphase().then(passphrase => {
    runApp(passphrase)
})

// process.setMaxListeners(0);

process.on('uncaughtException', (err) => {
    console.log("uncaughtException ERROR: ", err)
})

process.on('unhandledRejection', err => {
    console.log("unhandledRejection ERROR: ", err)
})


module.exports = app

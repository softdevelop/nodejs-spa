const path = require('path');
const __DEV__ = require('./env/development');
const __PRO__ = require('./env/production');
const __STAG__ = require('./env/staging');
const __TEST__ = require('./env/test');
const APP_NAME = 'nodejs-ejs-socket-template';
// config session
var SESSION = {
    APP_NAME,
    secret: APP_NAME + 'jki33234!@@',
    jwtSecret: `jwt-sct-${APP_NAME}-!@##@!`,
    cookie: { maxAge: 60000 }
}

// This is defaults config
const defaults = {
    ROOT: path.join(__dirname, ".."),
    PATH_CLIENT: path.join(__dirname, "../client"),
    PATH_MODELS: path.join(__dirname, "../app/models"),
    PATH_TEMPLATE_MAIL: path.join(__dirname, "../app/views/templates-mail"),
    PATH_ASSETS: path.join(__dirname, "../assets"),
    SESSION,
    ADMIN_URL: "/admin",
    MONEY_UNIT : 100,
    // 30 days = 2592000000 miliseconds
    RENEW_PLAN_TIME: 2592000000
}

const config = {
    development: {
        ...defaults,
        ...__DEV__
    },
    production: {
        ...defaults,
        ...__PRO__
    },
    staging: {
        ...defaults,
        ...__STAG__
    },
    test: {
        ...defaults,
        ...__TEST__
    }
}
module.exports = config[process.env.NODE_ENV || 'development'];

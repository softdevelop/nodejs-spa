const config = require("../index");
const {CODE} = require("../../app/utils/constants");
const UAParser = require('ua-parser-js');

module.exports = (req, res, next) => {
    res.locals.session = {
        userAuth: req.session.userAuth || false,
        myData: {
            name: "jinsphan"
        }
    };

    var _render = res.render;

    res.render = function (view, options, fn) {
        _render.call(this, view, {
            ...options,
            ADMIN_URL: config.ADMIN_URL,
            GAME_FEES: config.GAME_FEES,

        }, fn);
    }

    res.CODE = CODE
    res.CONFIG = config

    req.host_url = `${req.protocol}://${req.headers.host}`;
    
    const parser = new UAParser();
    const ua = req.headers['user-agent'];
    let browser = parser.setUA(ua).getBrowser().name + " " + parser.setUA(ua).getBrowser().version;
    let device = (parser.setUA(ua).getDevice().vendor != undefined ? parser.setUA(ua).getDevice().vendor : "") + " " + (parser.setUA(ua).getDevice().model != undefined ? parser.setUA(ua).getDevice().model : "") + " " + (parser.setUA(ua).getDevice().type != undefined ? parser.setUA(ua).getDevice().type : "");
    let os = parser.setUA(ua).getOS().name + " " + parser.setUA(ua).getOS().version;
    res.userDevice = (device === "  " ? "" : device + ", ") + os + ", " + browser

    next();
}
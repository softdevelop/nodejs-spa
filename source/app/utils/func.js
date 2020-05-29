const jwt = require("jsonwebtoken");
const config = require("../../config");
const momentTimezone = require('moment-timezone');

const jwtToken = (data = {}, options = {}) => {
    return jwt.sign(data, config.SESSION.jwtSecret, { expiresIn: 86400, ...options });
}

const pareJwtToken = (token) => {
    return jwt.verify(token, config.SESSION.jwtSecret)
}

const formatTimeToUtc = (time, timezone, format = 'YYYY-MM-DD hh:mm:ss') => {
    return momentTimezone.tz(time, format, timezone).utc().toISOString();
}

const composePromise = (...functions) =>
    initialValue =>
        functions.reduceRight(
            (sum, fn) => Promise.resolve(sum).then(fn),
            initialValue
        );

function makeTokenEmail(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
 function createEmail(email,token){
     return {from: "no-reply@pscd.com" || process.env.MAIL_USERNAME, 
     to: email, 
     subject: 'PSCD: verify email',
     html: `<p>Send code: ${token}</p>`
    }

 }
module.exports = {
    jwtToken,
    pareJwtToken,
    formatTimeToUtc,
    composePromise,
    makeTokenEmail,
    createEmail
}
const ejs = require('ejs')
const nodemailer = require('nodemailer');
const path = require('path')

const MAIL_ADMIN = process.env.MAIL_USERNAME;

// Default Mail Transport
const smtpTransport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

const EMAIL_TYPE = {
    MAIL_VERIFY_EMAIL: 'MAIL_VERIFY_EMAIL'
}

function Mailer(from, to) {
    return {
        sendMail: (emailType, bodyData = {}) => new Promise((resolve, reject) => {
            const mailTransport = smtpTransport
            const handleSendMail = (subject, templatePath) => {
                ejs.renderFile(
                    path.resolve(__dirname, templatePath),
                    {
                        ...bodyData
                    }
                ).then(html => {
                    return mailTransport.sendMail({
                        from, // sender address
                        to, // list of receivers
                        subject, // Subject line
                        html
                    }).then(resolve)
                }).catch(reject)
            }
            switch (emailType) {
                case EMAIL_TYPE.MAIL_VERIFY_EMAIL: {
                    handleSendMail(
                        emailType,
                        '../views/templates-mail/VerifyMail.ejs',
                    )
                    break;
                }
               
                default: reject(new Error('emailType is required'))
            }
        })
    }
}

module.exports = {
    EMAIL_TYPE,
    Mailer,
    MAIL_ADMIN
}
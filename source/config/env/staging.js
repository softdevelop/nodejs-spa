module.exports = {
    MONGOOSE_DB_URL: process.env.MONGOOSE_DB_URL,
    HOST: process.env.HOST,
    MAIL_DRIVER: process.env.MAIL_DRIVER,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_ENCRYPTION: process.env.MAIL_ENCRYPTION,
    IS_CHECK_RECAPCHA: false,
    IS_OPEN_TEST: false,
    IS_OPEN_HOLDING_PAGE: process.env.IS_OPEN_HOLDING_PAGE ? JSON.parse(process.env.IS_OPEN_HOLDING_PAGE) : false,
    APP_DOMAIN: 'https://www.example.com',
}
'use strict'

require('dotenv').config()

const moment = require('moment')
const shell = require('shelljs')

const DATABASE_NAME = process.env.MONGOOSE_DB_NAME;
const DATABASE_URL = process.env.MONGOOSE_DB_URL;

const run = async () => {
    try {
        let time = moment().format('YYYY-MM-DD-HH:mm')
        let filename = DATABASE_NAME + '_' + time
        await shell.exec(
            `cd scripts && bash ./backup-db.sh ${DATABASE_URL} ${filename}`
        )
    } catch (err) {
    }
}

run()

'use strict'

require('dotenv').config()

const path = require('path')
const fs = require('fs')
const shell = require('shelljs')

const ROOT_PATH = path.dirname(require.main.filename);
const DATABASE_NAME = process.env.MONGOOSE_DB_NAME;
const DATABASE_URL = process.env.MONGOOSE_DB_URL;

const run = async () => {
    try {
        let dbFolder = `${ROOT_PATH}/${DATABASE_NAME}`
        if (fs.existsSync(dbFolder)) {
            await shell.exec(
                `cd scripts && bash ./restore-db.sh ${DATABASE_URL} ${dbFolder} ${DATABASE_NAME}`
            )
        } else throw new Error('db-backup not exists')
    } catch (er) {
        console.log(er.message)
    }
}

run()

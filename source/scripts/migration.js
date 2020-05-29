'use strict';

require('dotenv').config();

const mongoose = require("mongoose");
const config = require('../config');
const modelsName = require("../app/models");

// Boostrap models
require(config.PATH_MODELS).map(modelName => `${config.PATH_MODELS}/${modelName}`).forEach(require);

// utils
const firstUpperCase = str => str[0].toUpperCase() + str.substr(1);
const mixString = (ch) => (str) => str.split(ch).map(firstUpperCase).join("");

const getModels = () => modelsName
    .map(mixString('_'))
    .map(str => str.slice(0, -1))
    .map(modelName => {
      if(modelName=='Categorie') return mongoose.model("Category")
      return mongoose.model(modelName) 
    });

const cleanDB = (db) => new Promise((rs, rj) => db.deleteMany({}).then(_ => db.collection.drop().then(rs).catch(rs)));
const migrateDB = async (db) => db.insertMany(db.getMigrateData ? await db.getMigrateData() : []);

const cleanDBs = (DBs) => Promise.all(DBs.map(cleanDB))
const migrateDBs = (DBs) => Promise.all(DBs.map(migrateDB))

const connect = () => new Promise((resolve, reject) => {
    mongoose.set('useCreateIndex', true);
    mongoose.connect(config.MONGOOSE_DB_URL, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', () => reject('Please install and start your mongodb'));
    db.once('open', resolve);
})

connect().then(() => {
    cleanDBs(getModels())
    .then(() => {
        return migrateDBs(getModels())
    })
    .then(async() => {
        console.log("All DB is migrated");
        process.exit(0);
    })
    .catch((er) => {
        console.log(er.message || "ERROR when migrate");
        process.exit(0);
    })
})
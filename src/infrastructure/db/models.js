//@ts-igonre
'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const Relations = require('./relations');

class Models {
    constructor() { }

    load() {
        let connections = {};
        let db = {
            Sequelize: Sequelize
        };

        const defaultAttributes = {
            logging: false,
            dialect: 'mysql',
            timezone: 'America/Sao_Paulo',
            define: {
                underscored: true
            }
        };

        let databases = fs.readFileSync(__dirname + '/databases.json');
        databases = JSON.parse(databases);

        Object.keys(databases)
            .forEach((key) => {
                if (databases[key].dialect !== 'mysql') {
                    return;
                }
                _.merge(databases[key], defaultAttributes);
                databases[key].user = databases[key].username;
            });

        Object.keys(databases)
            .forEach((key) => {
                if (databases[key].dialect !== 'mysql') {
                    return;
                }

                connections[key] = new Sequelize(
                    databases[key].database,
                    databases[key].username,
                    databases[key].password,
                    databases[key]
                );

                connections[key].dialect.supports.schemas = true;

                let folderPath = `${__dirname}/models/${key}`;
                let database = connections[key];
                db[key] = {};

                fs.readdirSync(folderPath)
                    .forEach((file) => {
                        let stats = fs.lstatSync(path.join(folderPath, file));
                        if (!stats.isDirectory()) {
                            let model = database['import'](path.join(folderPath, file));
                            db[key][model.name] = model;

                            db[key][model.name].options.schema = databases[key].database;
                            db[key][model.name].$schema = databases[key].database;
                        }
                    });

                db[key] = connections[key].models;
                db[key].sequelize = connections[key];
            });

        new Relations(db)
            .load();

        return db;
    }
}

module.exports = new Models().load();
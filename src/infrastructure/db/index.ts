import * as fs from 'fs';
import { Sequelize, ModelType } from 'sequelize';
import * as path from 'path';
import { databases } from '@infrastructure/db/config'

type Connections = {
    [key: string]: Sequelize
};

type ModelConfig = {
    [name: string]: ModelType
};

type DB = {
    [key: string]: ModelConfig,
};

class Loader {
    constructor() {}

    load(): DB {
        let connections: Connections;
        let db: DB = {};

        Object.keys(databases)
            .forEach((key) => {
                connections[key] = new Sequelize(
                    databases[key].database,
                    databases[key].username,
                    databases[key].password,
                    databases[key].options
                );

                let folderPath = `${__dirname}/models/${key}`;
                let database = connections[key];
                db[key] = {};

                fs.readdirSync(folderPath)
                    .forEach((file) => {
                        let stats = fs.lstatSync(path.join(folderPath, file));
                        if(!stats.isDirectory()) {
                            let model = database['import'](path.join(folderPath, file));
                            model.options.schema = databases[key].databases;
                            db[key][model.name] = model;
                        }
                    });

                db[key] = connections[key].models;
            });

        return db;
    }
}

const db = new Loader().load();

export { db };
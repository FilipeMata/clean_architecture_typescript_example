import fs from 'fs';
import path from 'path';
import { Sequelize, Options } from 'sequelize';
import sequelize from 'sequelize';
import { CustomerModel } from './models/store/customer';
import { OrderModel } from './models/store/order';
import { ProductModel } from './models/store/product';
import { LineItemModel } from './models/store/line-item';
import relations from './relations';

export type ModelMap = {
  customer: typeof CustomerModel,
  order: typeof OrderModel,
  product: typeof ProductModel,
  line_item: typeof LineItemModel
}

export interface DB {
  sequelize: Sequelize,
  connections: {
    [k: string]: Sequelize
  },
  models: ModelMap
}

let db: DB = null;

interface DatabasesConfig {
  [key: string]: Options
}

export const loadModels = async (): Promise<DB> => {
  const databases: DatabasesConfig = JSON.parse(fs.readFileSync(`${__dirname}/databases.json`).toString());

  if (db) {
    throw new Error('DB models already loaded');
  }

  const dbObj: any = {
    sequelize: sequelize,
    connections: {},
    models: {}
  };

  const connPromises = Object.keys(databases)
    .map((key) => {
      const defaultDbAttributes = {
        logging: console.log,
        timezone: '+00:00',
        define: {
          underscored: true
        },
        dialectOptions: {
          timezone: '+00:00'
        },
        retry: {
          max: 3
        },
        isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        bindParam: false,
      };

      const dbOptions = {...databases[key], ...defaultDbAttributes};

      const connection = new Sequelize(
        dbOptions.database,
        dbOptions.username,
        dbOptions.password,
        dbOptions
      );

      const folderPath = `${__dirname}/models/${key}`;

      fs.readdirSync(folderPath)
        .forEach((file) => {
          let stats = fs.lstatSync(path.join(folderPath, file));
          if (!stats.isDirectory()) {
            let model = connection.import(path.join(folderPath, file));
            connection.models[model.name].schema(dbOptions.database);

            dbObj.connections[key] = connection;

            let modelName = model.name;
            dbObj.models[modelName] = model;
          }
        });

      return connection.authenticate();
    });

  relations(dbObj);

  await Promise.all(connPromises);

  db = dbObj;

  return dbObj;
};

export const getModels = () => {
  return db;
};

export const getModel = (modelName: keyof ModelMap) => {
  return db.models[modelName];
}

export const unloadModels = async (): Promise<void> => {
  if (!db) {
    throw new Error('DB models are not loaded');
  }

  // @ts-ignore
  await Promise.allSettled(
    Object
      .keys(db.connections)
      .map(async (key) => {
        return db.connections[key].close();
      })
  );

  db = null;
};

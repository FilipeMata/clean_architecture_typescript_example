import { UnitOfWork } from '@adapters/common/interfaces/unit-of-work';
import { Transaction } from 'sequelize/types';
import { DB, getModels } from './models';

export class SequelizeUnitOfWork implements UnitOfWork {
  private _db: DB;
  private _transaction: Transaction;

  constructor() {
    this._db = getModels();
  }

  public async startTransaction(): Promise<void> {
    this._transaction = await this._db.connections.store
      .transaction({autocommit: false});
  }
  
  public async commitTransaction(): Promise<void> {
    await this._transaction?.commit();
    this._transaction = null;
  }

  public async rollbackTransaction(): Promise<void> {
    await this._transaction?.rollback();
    this._transaction = null;
  }

  get transaction (): Transaction {
    return this._transaction;
  }
}
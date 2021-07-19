import { UnitOfWork } from '@adapters/common/unit-of-work';
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
  
  public async commit(): Promise<void> {
    await this._transaction?.commit();
  }

  public async rollback(): Promise<void> {
    await this._transaction?.rollback();
  }

  get transaction (): Transaction {
    return this._transaction;
  }
}
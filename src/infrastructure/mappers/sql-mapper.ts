import { Entity } from '@entities';
import { Mapper } from 'src/adapters/gateways/mappers';

export default abstract class SQLMapper implements Mapper {
  private _dbName: string;
  private _scope: any;
  protected _db: any;
  protected _models: any;
  protected _transaction: any;
  
  constructor(dbName: string, modelName: string, connections: any, scope?: any) {
    this._dbName = dbName;
    this._db = connections[dbName][modelName];
    this._scope = scope;
  }

  public abstract toPersistence(entity: Entity<any>): any;
  public abstract toDomain(row: any): Entity<any>;

  protected async _getTransaction(): Promise<any> {
    if (this._scope) {
      return this._scope.getTransaction(this._dbName);
    }
  }

  public async insert(entity: Entity<any>): Promise<void> {
    const t = await this._getTransaction();

    return await this._db.create(
      this.toPersistence(entity), {
      transaction: t
    });
  }

  public async find(criteria: any): Promise<Entity<any>>{
    const t = await this._getTransaction();

    let options: any = {
      where: criteria,
    }

    if (t) {
      options.transaction = t;
    }

    const row = await this._db.findOne(options);
    if(!row) {
      return null;
    }

    return this.toDomain(row);
  };

  public async findAll(conditions: any): Promise<Array<Entity<any>>> {
    const t = await this._getTransaction();

    let options: any = {
      where: conditions,
      raw: true
    }

    if (t) {
      options.transaction = t;
    }

    const rows = await this._db.findAll(options);

    return rows.map((row: any) => {
      return this.toDomain(row);
    });
  };

  public async update(entity: Entity<any>): Promise<void> {
    const t = await this._getTransaction();

    const options = {
      where: {
        id: entity.id.toValue()
      },
      transaction: t
    };

    const data = this.toPersistence(entity);
    return this._db.update(data, options);
  }

  async insertCollection(entities: Array<Entity<any>>): Promise<void> {
    const t = await this._getTransaction();
    
    const rows = entities.map((e) => {
      return this.toPersistence(e);
    });
    
    return await this._db.bulkCreate(rows, {
      transaction: t
    });
  }

  async delete(entity: Entity<any>): Promise<void> {
    const t = await this._getTransaction();

    return await this._db.destroy({
      where: {
        id: entity.id.toValue()
      },
      transaction: t
    });
  }

  async deleteCollection(entities: Entity<any>[]): Promise<void> {
    const ids = entities.map((e) => {
      return e.id.toValue()
    });

    return await this.deleteByCriteria({id: ids});
  }

  async deleteByCriteria(criteria: any): Promise<void> {
    const t = await this._getTransaction();

    return await this._db.destroy({
      where: criteria,
      transaction: t
    });
  }
}

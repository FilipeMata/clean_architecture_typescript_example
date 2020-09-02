import { Entity } from '@entities';

export default abstract class SQLMapper {
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

  private async _getTransaction(): Promise<any> {
    if (this._scope) {
      return this._scope.getTransaction(this._dbName);
    }
  }

  public async insert(entity: Entity<any>): Promise<void> {
    return await this._db.create(
      this.toPersistence(entity), {
      transaction: this._getTransaction()
    });
  }

  public async find(criteria: any): Promise<Entity<any>>{
    let options: any = {
      where: criteria,
      transaction: this._getTransaction()
    }

    const row = await this._db.findOne(options);
    if(!row) {
      return null;
    }

    return this.toDomain(row);
  };

  protected async findCollection(conditions: any): Promise<Array<Entity<any>>> {
    let options: any = {
      where: conditions,
      transaction: this._getTransaction(),
      raw: true
    }

    const rows = await this._db.findAll(options);

    return rows.map((row: any) => {
      return this.toDomain(row);
    });
  };

  public async update(entity: Entity<any>): Promise<void> {
    const options = {
      where: {
        id: entity.id.toValue()
      },
      transaction: this._getTransaction()
    };

    const data = this.toPersistence(entity);
    return this._db.update(data, options);
  }

  async insertCollection(entities: Array<Entity<any>>): Promise<void> {
    const rows = entities.map((e) => {
      return this.toPersistence(e);
    });
    
    return await this._db.bulkCreate(rows, {
      transaction: this._getTransaction()
    });
  }

  async delete(entity: Entity<any>): Promise<void> {
    return await this._db.destroy({
      where: {
        id: entity.id.toValue()
      },
      transaction: this._getTransaction()
    });
  }

  async deleteCollection(entities: Entity<any>[]): Promise<void> {
    const ids = entities.map((e) => {
      return e.id.toValue()
    });

    return await this._db.destroy({
      where: {
        id: ids
      },
      transaction: this._getTransaction()
    });
  }
}

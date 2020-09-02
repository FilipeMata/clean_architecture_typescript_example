
import { UniqueEntityID, Entity } from '@entities';
import { Gateway } from '../base-gateway';

export default class GatewayDecorator implements Gateway {
  protected _baseGateway: Gateway;

  constructor(gateway: Gateway) {
    this._baseGateway = gateway;
  }

  public async abstractFindAll(entity: string, criteria: any): Promise<Entity<any>[]> {
    return this._baseGateway.abstractFindAll(entity, criteria);
  }

  public async abstractFind(entity: string, id: UniqueEntityID) {
    return this._baseGateway.abstractFind(entity, id);
  }

  public startTransaction() {
    this._baseGateway.startTransaction();
  }

  public async save(e: Entity<any>) {
    this._baseGateway.save(e);
  }

  public async saveCollection(entities: Entity<any>[]) {
    this._baseGateway.saveCollection(entities);
  }

  public async remove(e: Entity<any>) {
    this._baseGateway.remove(e);
  }

  public async removeCollection(entities: Entity<any>[]) {
    this._baseGateway.removeCollection(entities);
  }

  public async endTransaction() {
    this._baseGateway.endTransaction();
  }
}
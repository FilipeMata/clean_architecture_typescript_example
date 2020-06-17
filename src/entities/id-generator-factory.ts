import { UniqueEntityIDGenerator, Entity} from '@entities';

type EntityIDFactories = {
  [entity: string ]: UniqueEntityIDGenerator
}

export class UniqueEntityIDGeneratorFactory {
  private static _instance: UniqueEntityIDGeneratorFactory;
  private _entityIdFactories: EntityIDFactories;

  private constructor() { }

  public static getInstance(): UniqueEntityIDGeneratorFactory {
    if (!UniqueEntityIDGeneratorFactory._instance) {
      UniqueEntityIDGeneratorFactory._instance = new UniqueEntityIDGeneratorFactory();
    }

    return UniqueEntityIDGeneratorFactory._instance;
  }

  public init(factories: EntityIDFactories) {
    console.log('Entity ID Factories initalized');
    this._entityIdFactories = factories;
  }

  public getIdGeneratorFor(entity: Entity<any>): UniqueEntityIDGenerator {
    const className = entity.constructor.name;

    if (!this._entityIdFactories) {
      throw new Error('Entity ID Factories were not initialized');
    }
    
    if (this._entityIdFactories[className]) {
      return this._entityIdFactories[className];
    }
    
    return this._entityIdFactories['default'];
  }
}
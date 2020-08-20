import { v4 as uuid } from 'uuid';
import { UniqueEntityID, UniqueEntityIDGenerator } from '@entities';

export default class UUIDUniqueEntityIDGenerator implements UniqueEntityIDGenerator {
  constructor() { }
  
  public nextId(): UniqueEntityID {
    return new UniqueEntityID(uuid());
  }
}
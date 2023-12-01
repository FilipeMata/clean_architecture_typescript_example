import { randomUUID } from 'crypto';
import { UniqueEntityID, UniqueEntityIDGenerator } from '@entities';

export default class UUIDUniqueEntityIDGenerator implements UniqueEntityIDGenerator {
  constructor() { }
  
  public nextId(): UniqueEntityID {
    return new UniqueEntityID(randomUUID());
  }
}
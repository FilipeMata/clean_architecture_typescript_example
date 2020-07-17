import { genereateUUID } from '../functions';
import { Identifier } from './Identifier'

export class UniqueEntityID extends Identifier<string | number>{
  constructor(id?: string | number) {
    super(id ? id : genereateUUID())
  }
}
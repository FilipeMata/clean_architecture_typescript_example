import { Identifier } from '@entities';

export class UniqueEntityID extends Identifier<string | number>{
  constructor(id: string | number) {
    if (!id) {
      throw new Error('UniqueEntityID must have a non null value');
    }
    
    super(id)
  }
}
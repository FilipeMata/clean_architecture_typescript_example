import { Identifier } from '@entities';

export class UniqueEntityID extends Identifier<string | number>{
  constructor(id: string | number) {
    super(id)
  }
}
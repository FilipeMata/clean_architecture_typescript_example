import { Entity, UniqueEntityID, EntityError } from '@entities';

export interface LineItemBasicBuildProps {
  productId: number,
  quantity: number;
}

export interface LineItemBuidProps extends LineItemBasicBuildProps {
  id: number
}

export interface LineItemProps {
  id: UniqueEntityID
  productId: UniqueEntityID,
  quantity: number;
};

export class LineItemError extends EntityError {
  constructor(errors: string[]) {
    super('LineItem', errors);
  }
}

export class LineItem extends Entity<LineItemProps>{

  get productId(): UniqueEntityID {
    return this.props.productId;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  private constructor(props: LineItemProps, isNew: boolean) {
    super(props, isNew);
  }

  public static build(props: LineItemBuidProps, isNew: boolean): LineItem {
    /** some domain validations here **/
    const errors: Array<string> = [];

    if (props.quantity % 1 !== 0) {
      errors.push('Line Item quantity must be integer');
    }

    if (errors.length > 0) {
      throw new LineItemError(errors)
    }

    return new LineItem({
      id: new UniqueEntityID(props.id),
      productId: new UniqueEntityID(props.productId),
      quantity: props.quantity
    }, isNew);
  }
}
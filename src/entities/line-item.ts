import { Entity, UniqueEntityID, EntityError } from '@entities';

export interface LineItemBasicProps {
  productId: UniqueEntityID,
  quantity: number;
};

export interface LineItemProps extends LineItemBasicProps {
  id?: UniqueEntityID
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

  public static build(props: LineItemProps, isNew: boolean): LineItem {
    /** some domain validations here **/
    const errors: Array<string> = [];

    if (props.quantity % 1 !== 0) {
      errors.push('Line Item quantity must be integer');
    }

    if (errors.length > 0) {
      throw new LineItemError(errors)
    }

    return new LineItem(props, isNew);
  }
}
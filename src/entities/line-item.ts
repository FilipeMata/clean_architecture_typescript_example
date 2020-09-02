import { Entity, UniqueEntityID, Product } from '@entities';
import { Result } from '@shared/Result';

export interface ILineItemProps {
  product: Product,
  quantity: number;
};

export class LineItem extends Entity<ILineItemProps>{

  get product(): Product {
    return this.props.product;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  private constructor(props: ILineItemProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static build(props: ILineItemProps, id?: UniqueEntityID): Result<LineItem> {
    /** some domain validations here **/
    const errors: Array<string> = [];

    if (props.quantity % 1 !== 0) {
      errors.push('LineItem quantity must be an integer');
    }

    if (errors.length > 0) {
      return Result.fail<LineItem>(errors);
    }

    return Result.success<LineItem>(new LineItem(props, id));
  }
}
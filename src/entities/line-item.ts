import { Entity, UniqueEntityID } from '@entities';
import { Result } from '@shared/Result';

interface ILineItemProps {
  productId: UniqueEntityID;
  invoiceId: UniqueEntityID;
  quantity: number;
};

export class LineItem extends Entity<ILineItemProps>{

  get productId(): UniqueEntityID {
    return this.props.productId;
  }

  get invoiceId(): UniqueEntityID {
    return this.props.invoiceId;
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
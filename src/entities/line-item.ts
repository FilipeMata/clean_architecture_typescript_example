import { Product } from '@entities/product';
import { Entity } from '@shared/domain/entity';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';
import { Result } from '@shared/Result';

interface ILineItemProps {
  productId: UniqueEntityID;
  quantity: number;
};

class LineItem extends Entity<ILineItemProps>{

  get productId(): UniqueEntityID {
    return this.props.productId;
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

export { LineItem };

import { Entity } from '@shared/domain/Entity';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';
import { Result } from '@shared/Result';

interface IChargeProps {
  customId: string;
  paymentMethod: string;
  status: string;
};

class Charge extends Entity<IChargeProps>{

  get customId(): string {
    return this.props.customId;
  }

  get paymentMethod(): string {
    return this.props.paymentMethod;
  }

  get status(): string {
    return this.props.status;
  }

  private constructor(props: IChargeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static build(props: IChargeProps, id?: UniqueEntityID): Result<Charge> {
    /** some domain validations here **/
    const errors: Array<string> = [];

    if (!props.customId) {
      errors.push('Charge must have a protocol');
    }

    if (errors.length > 0) {
      return Result.fail<Charge>(errors);
    }

    return Result.success<Charge>(new Charge(props, id));
  }
}

export { Charge };

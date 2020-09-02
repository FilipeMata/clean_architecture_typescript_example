import { ValueObject } from '@entities';
import { Result } from '@shared/Result';

interface IChargeProps {
  number: string,
  paymentMethod: string;
  status: string;
};

export class Charge extends ValueObject<IChargeProps> {

  public toValue() {
    return {
      number: this.props.number,
      paymentMethod: this.props.paymentMethod,
      status: this.props.status
    };
  }

  private constructor(props: IChargeProps) {
    super(props);
  }

  public static build(props: IChargeProps): Result<Charge> {
    /** some domain validations here **/
    const errors: Array<string> = [];

    if (!props.number) {
      errors.push('Charge must have a protocol');
    }

    if (errors.length > 0) {
      return Result.fail<Charge>(errors);
    }

    return Result.success<Charge>(new Charge(props));
  }
}

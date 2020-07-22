import { ValueObject } from '@shared/domain/ValueObject';
import { Result } from '@shared/Result';

interface IAddressProps {
    street: string;
    neighborhood: string;
    number: string;
    state: string;
    country: string;
    complement: string;
    zipcode: string;
};

class Address extends ValueObject<IAddressProps>{

    get street (): string {
        return this.props.street;
    }

    get neighborhood (): string {
        return this.props.neighborhood;
    }

    get number (): string {
        return this.props.number;
    }

    get state(): string {
        return this.props.state;
    }

    get country(): string {
        return this.props.country;
    }

    get complement(): string {
        return this.props.complement;
    }

    get zipcode(): string {
        return this.props.zipcode;
    }

    private constructor(props: IAddressProps) {
        super(props);
    }

    public static build(props: IAddressProps): Result<Address> {
        /** some domain validations here **/

        let errors: Array<string> = [];

        if (!props.street || props.street.length < 2) {
            errors.push('Address street must be grater than 2 chars');
        }

        /** put some other validations here */

        if (errors) {
            return Result.fail<Address>(errors);
        }

        return Result.success<Address>(new Address(props))
    }
}

export { Address };

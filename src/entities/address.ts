import { ValueObject } from '@entities';
import { ValueObjectError } from './common/value-object';

export interface AddressProps {
    street: string;
    neighborhood: string;
    city: string;
    number: string;
    state: string;
    country: string;
    complement: string;
    zipcode: string;
};

export class AddressError extends ValueObjectError {
    constructor(errors: string[]) {
      super('Address', errors);
    }
}

export class Address extends ValueObject<AddressProps>{

    get street (): string {
        return this.props.street;
    }

    get neighborhood (): string {
        return this.props.neighborhood;
    }

    get city(): string {
        return this.props.city;
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

    private constructor(props: AddressProps) {
        super(props);
    }

    public static build(props: AddressProps): Address {
        /** some domain validations here **/

        let errors: Array<string> = [];

        if (!props.street || props.street.length < 2) {
            errors.push('street_too_short');
        }

        /** put some other validations here */

        if (errors.length > 0) {
            throw new AddressError(errors);
        }

        return new Address(props);
    }
}

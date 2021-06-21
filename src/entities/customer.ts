import { Entity, UniqueEntityID, Address, EntityError } from '@entities';

export interface CustomerProps {
    id?: UniqueEntityID,
    document: string;
    name: string;
    cellphone: string;
    email: string;
    birthdate: Date;
    address: Address;
};

export class CustomerError extends EntityError {
    constructor(errors: string[]) {
      super('Customer', errors);
    }
}

export class Customer extends Entity<CustomerProps>{

    get document(): string {
        return this.props.document;
    }

    get name(): string {
        return this.props.name;
    }

    get cellphone(): string {
        return this.props.cellphone;
    }

    get email(): string {
        return this.props.email;
    }

    get birthdate(): Date {
        return this.props.birthdate;
    }

    get address(): Address {
        return this.props.address;
    }

    private constructor(props: CustomerProps) {
        super(props, !!props.id);
    }

    public static build(props: CustomerProps): Customer {
        /** some domain validations here **/
        const errors: Array<string> = [];

        if (props.document.length !== 11 && props.document.length !== 14) {
            errors.push('invalid_document');
        }

        /** put other validations here */

        if (errors.length > 0) {
            throw new CustomerError(errors);
        }

        return new Customer(props);
    }
}

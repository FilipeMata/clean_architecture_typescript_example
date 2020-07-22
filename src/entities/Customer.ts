import { Address } from '@entities/Address';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';
import { Entity } from '@shared/domain/Entity';
import { Result } from '@shared/Result';

export interface ICustomer {
    document: string;
    name: string;
    cellphone: string;
    email: string;
    birthdate: Date;
    address: Address;
};

class Customer extends Entity<ICustomer>{

    get document(): string {
        return this.props.name;
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

    private constructor(props: ICustomer, id?: UniqueEntityID) {
        super(props, id);
    }

    public static build(props: ICustomer, id?: UniqueEntityID): Result<Customer> {
        /** some domain validations here **/
        const errors: Array<string> = [];

        if (props.document.length !== 11 && props.document.length !== 14) {
            errors.push('Document must be a CPF or a CNPJ');
        }

        /** put other validations here */

        if (errors.length > 0) {
            return Result.fail<Customer>(errors);
        }

        return Result.success<Customer>(new Customer(props, id));
    }
}

export default Customer;

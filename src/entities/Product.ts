/**
 * @author: Filipe Mata
 */

import { Entity } from '@shared/domain/Entity';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';
import { Result } from '@shared/Result';

interface IProductProps {
    name: string;
    description: string;
    price: number;
};

class Product extends Entity<IProductProps>{

    get name (): string {
        return this.props.name;
    }

    get description (): string {
        return this.props.description;
    }

    get price(): number {
        return this.props.price;
    }

    private constructor (props: IProductProps, id?: UniqueEntityID) {
        super(props, id);
    }  

    public static build(props: IProductProps, id?: UniqueEntityID): Result<Product> { 
        /** some domain validations here **/
        const errors: Array<string> = [];

        if (props.price < 0) {
            errors.push('Price should be greater than 0');
        }

        if(errors.length > 0) {
            return Result.fail<Product>(errors);
        }

        return Result.success<Product>(new Product(props, id));
    }
}

export { Product };

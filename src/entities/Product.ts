/**
 * @author: Filipe Mata
 */

import { Entity } from '@shared/domain/Entity';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';

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

    public static build(props: IProductProps, id?: UniqueEntityID): { 
        /** some domain validations here **/
        
        return new Product(props, id);
    }
}

export default Product;

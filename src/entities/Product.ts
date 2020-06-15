import { Entity } from '../shared/domain/Entity';

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

    private constructor (props: IProductProps, id?: UniqueEntityId) {
        super(props, id);
    }  

    public static createProduct(props: IProductProps, id?: UniqueEntityId): Product { 
        /** some domain validations here **/
        
        return new Product(props, id);
    }
}

export default Product;

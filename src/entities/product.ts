import { Entity, EntityError, UniqueEntityID } from '@entities';

interface ProductProps {
    id?: UniqueEntityID,
    name: string;
    description: string;
    price: number;
};

export class ProductError extends EntityError {
    constructor(errors: string[]) {
      super('Product', errors);
    }
}
  
export class Product extends Entity<ProductProps>{

    get name (): string {
        return this.props.name;
    }

    get description (): string {
        return this.props.description;
    }

    get price(): number {
        return this.props.price;
    }

    private constructor (props: ProductProps) {
        super(props, !props.id);
    }  

    public static build(props: ProductProps): Product { 
        /** some domain validations here **/
        const errors: Array<string> = [];

        if (props.price < 0) {
            errors.push('Product price is too low');
        }

        if(errors.length > 0) {
            throw new ProductError(errors);
        }

        return new Product(props);
    }
}

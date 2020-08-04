import { Address, LineItem, Charge }  from '@entities';
import { Entity, UniqueEntityID } from '@entities';
import { Result } from '@shared/Result';

interface IOrderProps {
    billingAddress: Address;
    lineItems?: Array<LineItem>;
    customerId: UniqueEntityID;
    charge?: Charge;
};

export class Order extends Entity<IOrderProps>{
    public static MAX_NUMBER_OF_LINE_ITEMS_PER_INVOICE = 7;

    get billingAddress(): Address {
        return this.props.billingAddress;
    }

    get lineItems(): Array<LineItem> {        
        return this.props.lineItems || [];
    }

    set lineItems(lineItems: LineItem[]) {
        this.props.lineItems = lineItems;
    }

    get customerId(): UniqueEntityID {
        return this.props.customerId;
    }

    get charge (): Charge | undefined {
        return this.props.charge;
    }

    private constructor(props: IOrderProps, id?: UniqueEntityID) {
        super(props, id);
    }  

    public linkCharge(ch: Charge): void {
        this.props.charge = ch;
    }

    public static build(props: IOrderProps, id?: UniqueEntityID): Result<Order> {
        /** some domain validations here **/
        if (!props.lineItems) {
            props.lineItems = [];
        }

        let errors: Array<string> = [];

        if (props.lineItems.length >= Order.MAX_NUMBER_OF_LINE_ITEMS_PER_INVOICE) {
            errors.push('Max number of line items reached');
        }

        if (errors.length > 0) {
            return Result.fail<Order>(errors);
        }
        
        return Result.success<Order>(new Order(props, id));
    }
    
    public addLineItem(lineItem: LineItem): Result<void> {
        if (!this.props.lineItems) {
            this.props.lineItems = [lineItem];
            return Result.success<void>();
        }

        if (this.props.lineItems.length >= Order.MAX_NUMBER_OF_LINE_ITEMS_PER_INVOICE) {
            return Result.fail<void>('Max number of genres reached')
        } 

        this.props.lineItems.push(lineItem);
        return Result.success<void>();
    }
    
}
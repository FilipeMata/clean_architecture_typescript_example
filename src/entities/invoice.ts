import { Address, LineItem, Charge }  from '@entities';
import { Entity, UniqueEntityID } from '@entities';
import { Result } from '@shared/Result';

interface IInvoiceProps {
    billingAddress: Address;
    lineItems?: Array<LineItem>;
    customerId: UniqueEntityID;
    charge?: Charge;
};

export class Invoice extends Entity<IInvoiceProps>{
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

    private constructor(props: IInvoiceProps, id?: UniqueEntityID) {
        super(props, id);
    }  

    public linkCharge(ch: Charge): void {
        this.props.charge = ch;
    }

    public static build(props: IInvoiceProps, id?: UniqueEntityID): Result<Invoice> {
        /** some domain validations here **/
        if (!props.lineItems) {
            props.lineItems = [];
        }

        let errors: Array<string> = [];

        if (props.lineItems.length >= Invoice.MAX_NUMBER_OF_LINE_ITEMS_PER_INVOICE) {
            errors.push('Max number of line items reached');
        }

        if (errors.length > 0) {
            return Result.fail<Invoice>(errors);
        }
        
        return Result.success<Invoice>(new Invoice(props, id));
    }
    
    public addLineItem(lineItem: LineItem): Result<void> {
        if (!this.props.lineItems) {
            this.props.lineItems = [lineItem];
            return Result.success<void>();
        }

        if (this.props.lineItems.length >= Invoice.MAX_NUMBER_OF_LINE_ITEMS_PER_INVOICE) {
            return Result.fail<void>('Max number of genres reached')
        } 

        this.props.lineItems.push(lineItem);
        return Result.success<void>();
    }
    
}
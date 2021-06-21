import { Address, LineItem, LineItemProps, LineItemBasicProps, EntityError }  from '@entities';
import { Entity, UniqueEntityID } from '@entities';

interface OrderProps {
    id?: UniqueEntityID;
    billingAddress: Address;
    lineItems?: Array<LineItem>;
    buyerId: UniqueEntityID;
    invoiceNumber?: string,
    invoiceUrl?: string;
};

interface OrderBuildProps {
    id?: UniqueEntityID;
    billingAddress: Address;
    lineItems?: Array<LineItemProps>;
    buyerId: UniqueEntityID;
    invoiceNumber?: string,
    invoiceUrl?: string
};

export class OrderError extends EntityError {
    constructor(errors: string[]) {
      super('Order', errors);
    }
}

export class Order extends Entity<OrderProps>{
    public static MAX_NUMBER_OF_LINE_ITEMS_PER_ORDER = 7;
    private _lastLineItemId: UniqueEntityID;

    get billingAddress(): Address {
        return this.props.billingAddress;
    }

    get invoiceNumber(): string {
        return this.props.invoiceNumber;
    }

    get invoiceUrl(): string {
        return this.props.invoiceUrl;
    }
 
    get lineItems(): Array<LineItem> {        
        return this.props.lineItems || [];
    }

    set lineItems(lineItems: LineItem[]) {
        this.props.lineItems = lineItems;
    }

    get buyerId(): UniqueEntityID {
        return this.props.buyerId;
    }

    private constructor(props: OrderProps) {
        super(props, !!props.id);
        this._lastLineItemId = this.lineItems[this.lineItems.length - 1].id;
    }  

    public invoice(invoiceNumber: string, invoiceUrl?: string) {
        this.props.invoiceNumber = invoiceNumber;
        this.props.invoiceUrl = invoiceUrl;
    }

    public addLineItem(lineItemBasicProps: LineItemBasicProps) {
        const errors: string[] = [];

        let lineItemProps = lineItemBasicProps as LineItemProps;

        if (this.lineItems.length >= Order.MAX_NUMBER_OF_LINE_ITEMS_PER_ORDER) {
            errors.push('Max line items reached');
        }

        lineItemProps.id = new UniqueEntityID(+this._lastLineItemId.toValue() + 1);
        const lineItem = LineItem.build(lineItemProps, true);
        
        if (errors.length > 0) {
            throw new OrderError(errors);
        }
        
        this._lastLineItemId = lineItemProps.id;
        this.lineItems.push(lineItem);
    }

    public static build(buildProps: OrderBuildProps, id?: UniqueEntityID): Order {
        /** some domain validations here **/
        
        const props: OrderProps = {
            billingAddress: buildProps.billingAddress,
            buyerId: buildProps.buyerId,
            lineItems: [],
            invoiceNumber: buildProps.invoiceNumber,
            invoiceUrl: buildProps.invoiceUrl
        };

        const errors: string[] = [];

        if (buildProps.lineItems.length >= Order.MAX_NUMBER_OF_LINE_ITEMS_PER_ORDER) {
            errors.push('Max line items reached');
        }

        const existentLineItemProps = buildProps.lineItems.find((item) => !!item.id)
        
        if (!buildProps.id && !!existentLineItemProps) {
            errors.push('It is not possible add existent line items to a new order');
            throw new OrderError(errors);
        }
        
        const newLineItemProps = buildProps.lineItems.find((item) => !item.id);

        if (!!buildProps.id && newLineItemProps) {
            errors.push('It is not allowed build an existent order with a new line item');
            throw new OrderError(errors);
        }

        if (!!buildProps.id) {

            buildProps.lineItems.sort((a, b) => +a.id.toValue() - +b.id.toValue());
            for (let i = 0; i < buildProps.lineItems.length; i++) {
    
                const lineItem = LineItem.build(buildProps.lineItems[i], false);
                props.lineItems.push(lineItem);
            }
        } else {

            for (let i = 0; i < buildProps.lineItems.length; i++) {
    
                let newLineItemProps = buildProps.lineItems[i] as LineItemProps;
                const lastLineItem = props.lineItems[props.lineItems.length - 1];
                newLineItemProps.id = new UniqueEntityID((+lastLineItem?.id?.toValue() || 0) + 1);
    
                const newlineItem = LineItem.build(newLineItemProps, true);
                props.lineItems.push(newlineItem);
            }
        }
        
        return new Order(props);
    }    
}
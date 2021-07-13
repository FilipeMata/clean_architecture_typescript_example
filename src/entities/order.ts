import { Address, LineItem, LineItemProps, LineItemBasicBuildProps, LineItemBuidProps, EntityError }  from '@entities';
import { Entity, UniqueEntityID } from '@entities';

interface OrderLineItemBuildProps extends LineItemBasicBuildProps {
    id?: number
}

export interface Invoice {
    number: string,
    url?: string
}
  
interface OrderProps {
    id?: UniqueEntityID;
    billingAddress: Address;
    lineItems?: Array<LineItem>;
    buyerId: UniqueEntityID;
    invoice?: Invoice
};

interface OrderBuildProps {
    id?: UniqueEntityID;
    billingAddress: Address;
    builtLineItems?: Array<LineItem>;
    lineItems?: Array<OrderLineItemBuildProps>;
    buyerId: UniqueEntityID;
    invoice?: Invoice
};

export class OrderError extends EntityError {
    constructor(errors: string[] | string) {
      super('Order', errors);
    }
}

export class Order extends Entity<OrderProps>{
    public static MAX_NUMBER_OF_LINE_ITEMS_PER_ORDER = 7;
    private _lastLineItemId: UniqueEntityID;

    get billingAddress(): Address {
        return this.props.billingAddress;
    }

    get invoice(): Invoice {
        return this.props.invoice;
    }
 
    get lineItems(): Array<LineItem> {        
        return this.props.lineItems || [];
    }

    get buyerId(): UniqueEntityID {
        return this.props.buyerId;
    }

    private constructor(props: OrderProps) {
        super(props, !!props.id);
        this._lastLineItemId = this.lineItems[this.lineItems.length - 1].id;
    }  

    public addInvoice(invoice: Invoice) {
        if (this.invoice) {
            throw new OrderError('Order already has an invoice');
        }

        this.props.invoice = invoice;
    }

    public addLineItem(lineItemBasicProps: LineItemBasicBuildProps) {
        const errors: string[] = [];

        if (this.lineItems.length >= Order.MAX_NUMBER_OF_LINE_ITEMS_PER_ORDER) {
            errors.push('Max line items reached');
        }

        const nextLineItemID = +this._lastLineItemId.toValue() + 1;

        let lineItemProps: LineItemBuidProps = {
            id: nextLineItemID,
            productId: lineItemBasicProps.productId,
            quantity: lineItemBasicProps.quantity
        };
        
        const lineItem = LineItem.build(lineItemProps, true);
        
        if (errors.length > 0) {
            throw new OrderError(errors);
        }
        
        this._lastLineItemId = lineItem.id;
        this.lineItems.push(lineItem);
    }

    public static build(buildProps: OrderBuildProps): Order {
        /** some domain validations here **/

        buildProps.builtLineItems.sort((a, b) => +a.id.toValue() - +b.id.toValue());
        
        const props: OrderProps = {
            billingAddress: buildProps.billingAddress,
            buyerId: buildProps.buyerId,
            lineItems: buildProps.builtLineItems || [],
            invoice: buildProps.invoice
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

            buildProps.lineItems.sort((a, b) => +a.id - +b.id);
            for (let i = 0; i < buildProps.lineItems.length; i++) {

                if (!buildProps.lineItems[i].id) {
                    return;
                }
    
                const lineItem = LineItem.build(buildProps.lineItems[i] as LineItemBuidProps, false);
                props.lineItems.push(lineItem);
            }
        } else {

            for (let i = 0; i < buildProps.lineItems.length; i++) {
    
                let newLineItemProps = buildProps.lineItems[i];
                const lastLineItem = props.lineItems[props.lineItems.length - 1];
                newLineItemProps.id = (+lastLineItem?.id?.toValue() || 0) + 1;
    
                const newlineItem = LineItem.build(newLineItemProps as LineItemBuidProps, true);
                props.lineItems.push(newlineItem);
            }
        }
        
        return new Order(props);
    }    
}
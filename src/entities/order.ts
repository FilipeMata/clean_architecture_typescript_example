import { Address, LineItem, ILineItemProps, Charge, Customer }  from '@entities';
import { Entity, UniqueEntityID } from '@entities';
import { Result } from '@shared/Result';

interface IOrderProps {
    billingAddress: Address;
    lineItems?: Array<LineItem>;
    buyer: Customer;
    charge?: Charge;
};

interface IOrderBuildProps {
    billingAddress: Address;
    lineItems?: Array<ILineItemProps>;
    buyer: Customer;
    charge?: Charge;
};

export class Order extends Entity<IOrderProps>{
    public static MAX_NUMBER_OF_LINE_ITEMS_PER_ORDER = 7;

    get billingAddress(): Address {
        return this.props.billingAddress;
    }

    get lineItems(): Array<LineItem> {        
        return this.props.lineItems || [];
    }

    set lineItems(lineItems: LineItem[]) {
        this.props.lineItems = lineItems;
    }

    get buyer(): Customer {
        return this.props.buyer;
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

    public static build(buildProps: IOrderBuildProps, id?: UniqueEntityID): Result<Order> {
    /** some domain validations here **/
        
        const props: IOrderProps = {
            billingAddress: buildProps.billingAddress,
            buyer: buildProps.buyer,
            lineItems: []
        };

        if (!buildProps.lineItems) {
            buildProps.lineItems = [];
        }
        
        let errors: Array<string> = [];

        if (buildProps.lineItems.length >= Order.MAX_NUMBER_OF_LINE_ITEMS_PER_ORDER) {
            errors.push('max_line_items_reached');
        }

        const mergeErros = (addinErrors: Array<string>) => {
            addinErrors.forEach((error) => {
                errors.push(error);
            });
        }
        const handleLineItemResult = (lineItemResult: Result<LineItem>) => {
            if (!lineItemResult.succeeded) { 
                mergeErros(lineItemResult.errors);
            }

            props.lineItems.push(lineItemResult.value)
        }

        buildProps.lineItems.forEach((item) => {
            const lineItemResult = LineItem.build(item);
            handleLineItemResult(lineItemResult)
        })

        if (errors.length > 0) {
            return Result.fail<Order>(errors);
        }
        
        return Result.success<Order>(new Order(props, id));
    }    
}
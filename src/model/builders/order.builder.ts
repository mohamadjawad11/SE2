import { IItem } from "../IItem";
import { Order } from "../Order.model";
import logger from "../../utility/logger";

export class OrderBuilder{
    private item!:IItem;
    private price!:number;
    private quantity!:number;
    private id!:string;

    public static create():OrderBuilder{
        return new OrderBuilder();
    }

    setItem(item:IItem):OrderBuilder{
        this.item=item;
        return this;
    }

    setPrice(price:number):OrderBuilder{
        this.price=price;
        return this;
    }

    setQuantity(quantity:number):OrderBuilder{
        this.quantity=quantity;
        return this;
    }

    setID(id:string):OrderBuilder{
        this.id=id;
        return this;
    }

    build():Order{
        const requiredProperties=[
            this.item,
            this.price,
            this.quantity,
            this.id
        ];

         for (const prop of requiredProperties) {
            if (prop === undefined || prop === null) {
                logger.error("Missing required property for Cake: " + prop);
                throw new Error("Missing required property for Cake");
            }
        }

        return new Order(
            this.item,
            this.price,
            this.quantity,
            this.id
        );
    }


}

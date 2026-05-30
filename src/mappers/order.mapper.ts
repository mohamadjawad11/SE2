import { IOrder } from "model/IOrder";
import { IMapper } from "./IMapper";
import { OrderBuilder } from "model/builders/order.builder";
import { IItem } from "model/IItem";


export class CSVOrderMapper implements IMapper<string[],IOrder>{
    constructor(private itemMapper:IMapper<string[],IItem>){

    }
    map(data: string[]): IOrder {
        const item:IItem=this.itemMapper.map(data);
        return OrderBuilder.create()
                           .setID(data[0])
                           .setItem(item)
                           .setQuantity(parseInt(data[data.length-1]))
                           .setPrice(parseInt(data[data.length-2]))
                           .build();
    }
    
}
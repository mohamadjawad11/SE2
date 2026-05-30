import { IItem } from "./IItem";



export interface IOrder {
    getItem():IItem;
    getPrice():number;
    getQuantity():number;
    getID():string;
}
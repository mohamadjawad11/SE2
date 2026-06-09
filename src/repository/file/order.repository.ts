import { InvalidItem, ItemNotFound } from "../../utility/exceptions/RepositoryExceptions";
import { ID, IRepository } from "../IRepository";
import logger from "../../utility/logger";
import { IOrder } from "model/IOrder";

export abstract class OrderRepository implements IRepository<IOrder> {


    abstract load(): Promise<IOrder[]>;

    abstract save(Orders: IOrder[]): Promise<void>;


    async getAll(): Promise<IOrder[]> {
        const orders = await this.load();
        logger.info(`All orders retrieved successfully. Total orders: ${orders.length}`);
        return orders;
    }



    async getById(id: ID): Promise<IOrder | null> {
        const orders = await this.load();
        const order = orders.find(order => order.getID() === id.getID());
        if (!order) {
            logger.error(`Order with ID ${id.getID()} not found.`);
            throw new ItemNotFound(`Order with ID ${id.getID()} not found.`);
        }
        logger.info(`Order with ID ${id.getID()} retrieved successfully.`);
        return order;
    }


    async create(item: IOrder): Promise<ID> {
        if(!item){
            logger.error("Invalid order item.");
            throw new InvalidItem("Invalid order item.");
        }
       const orders = await this.load();
       const id=orders.push(item); //orders.push returns a nb which is length of new array and it is the id in my case
       await this.save(orders);
       logger.info(`Order with ID ${id} created successfully.`);
       return { getID: () => String(id) };
      
    }


    async update(item: IOrder): Promise<IOrder | null> {
        if(!item){
            logger.error("Invalid order item.");
            throw new InvalidItem("Invalid order item.");
        }
        const orders = await this.load();
        const index = orders.findIndex(order => order.getID() === item.getID());
        if (index === -1) {
            logger.error(`Order with ID ${item.getID()} not found.`);
            throw new ItemNotFound(`Order with ID ${item.getID()} not found.`);
        }
        orders[index] = item;
        await this.save(orders);
        logger.info(`Order with ID ${item.getID()} updated successfully.`);
        return item;
    }


    async delete(id: ID): Promise<void> {
        if(!id){
            logger.error("Invalid order ID.");
            throw new InvalidItem("Invalid order ID.");
        }
        const orders = await this.load();
        const index = orders.findIndex(order => order.getID() === id.getID());
        if (index === -1) {
            logger.error(`Order with ID ${id.getID()} not found.`);
            throw new ItemNotFound(`Order with ID ${id.getID()} not found.`);
        }
        orders.splice(index, 1); // Remove the order from the array ,1 means remove one element at the index
        await this.save(orders);
        logger.info(`Order with ID ${id.getID()} deleted successfully.`);
    }



}
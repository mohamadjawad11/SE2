//SOLID

export interface Order{
    id:number;
    item:string;
    price:number;
}


export class OrderManagement {
    //get orders, store orders, add orders
    private MyOrders: Order[] = [];

    constructor(private validator: IValidator, private financeCalculator: IFinanceCalculator) {
     
    }

    getOrders(){
        return this.MyOrders;
    }

    addOrder(item:string, price:number){
      //validate item, validate price
      const newOrder:Order = { id: this.MyOrders.length + 1, item, price };
      this.validator.validate(newOrder);
      this.MyOrders.push(newOrder);
    }

    fetchOrderById(id:number){
      return this.MyOrders.find(order => order.id === id);
    }

    getTotalRevenue(){
        return this.financeCalculator.calculateTotalRevenue(this.MyOrders);
    }

    getAverageBuyPower(){
        return this.financeCalculator.calculateAverageBuyPower(this.MyOrders);
    }
}


interface IValidator{
    validate(order:Order):void;
}


export class Validator implements IValidator{

    validate(order:Order): void {
        new ItemValidator().validate(order);
        new PriceValidator().validate(order);
        new MaxPriceValidator().validate(order);
    }

}


export class ItemValidator implements IValidator{
     private MyItems=[
    "Sponge",
    "Chocolate",
    "Red Velvet",
    "Birthday",
    "Carrot",
    "Marble",
    "Coffee",
    ];
    validate(order: Order): void {
        if (!this.MyItems.includes(order.item)) {
            throw new Error(`Invalid item. Must be one of: ${this.MyItems.join(", ")}`);
        }
    }
}



export class PriceValidator implements IValidator{
    validate(order: Order): void {
        if (order.price <= 0) {
            throw new Error("Price must be greater than zero");
        }
    }
}

export class MaxPriceValidator implements IValidator{
    validate(order: Order): void {
        if (order.price > 100) {
            throw new Error("Price must be less than 100");
        }
    }
}

export interface IFinanceCalculator{
    calculateTotalRevenue(orders:Order[]):number;
    calculateAverageBuyPower(orders:Order[]):number;
}

export class FinanceCalculator implements IFinanceCalculator{
    //calculate total revenue, calculate average buy power
    public  calculateTotalRevenue(orders:Order[]){
        return orders.reduce((total, order) => total + order.price, 0);
    }

    public  calculateAverageBuyPower(orders:Order[]){
        const totalRevenue = this.calculateTotalRevenue(orders);
        return orders.length === 0 ? 0 : totalRevenue / orders.length;
    }
}


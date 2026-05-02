import {FinanceCalculator, OrderManagement, Validator} from "../src/cleanCode";

describe('OrderManagement', () => {
    it("should add an order",()=>{

        //Arrange
        const validator=new Validator();
        const calculator=new FinanceCalculator();
        const orderManagement = new OrderManagement(validator, calculator);
        const item="Sponge";
        const price=10;

        //Act
        orderManagement.addOrder(item, price);

        //Assert
        expect(orderManagement.getOrders()).toEqual([{id:1, item, price}]);
        
    });

    it("should get an order by id",()=>{

        //Arrange
        const validator=new Validator();
        const calculator=new FinanceCalculator();
        const orderManagement = new OrderManagement(validator, calculator);
        const item="Sponge";
        const price=10;
        orderManagement.addOrder(item, price);

        //Act
        const order=orderManagement.fetchOrderById(1);

        //Assert
        expect(order).toEqual({id:1, item, price});
    });
});

describe("FinanceCalculator",()=>{
    it("should calculate total revenue",()=>{
        //Arrange
        const calculator=new FinanceCalculator();
        const orders=[
            {id:1, item:"Sponge", price:10},
            {id:2, item:"Brush", price:20}
        ];

        //Act
        const totalRevenue=calculator.calculateTotalRevenue(orders);

        //Assert
        expect(totalRevenue).toBe(30);
    });

    it("should calculate average buy power",()=>{
        //Arrange
        const calculator=new FinanceCalculator();
        const orders=[
            {id:1, item:"Sponge", price:10},
            {id:2, item:"Brush", price:20}
        ];

        //Act
        const averageBuyPower=calculator.calculateAverageBuyPower(orders);

        //Assert
        expect(averageBuyPower).toBe(15);
    });
});
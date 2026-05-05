import {FinanceCalculator, OrderManagement, Validator} from "../src/cleanCode";

describe('OrderManagement', () => {

    let orderManagement: OrderManagement;
    let validator: Validator;
    let calculator: FinanceCalculator;
    beforeAll(()=>{
        validator=new Validator();
        calculator=new FinanceCalculator();
    })

    beforeEach(()=>{
        orderManagement = new OrderManagement(validator, calculator);
    });

    it("should add an order",()=>{

        //Arrange
        const item="Sponge";
        const price=10;

        //Act
        orderManagement.addOrder(item, price);

        //Assert
        expect(orderManagement.getOrders()).toEqual([{id:1, item, price}]);
        
    });

    it("should get an order by id",()=>{

        //Arrange
        const item="Sponge";
        const price=10;
        orderManagement.addOrder(item, price);

        //Act
        const order=orderManagement.fetchOrderById(1);

        //Assert
        expect(order).toEqual({id:1, item, price});
    });

    it("should call finance calculator to get total revenue",()=>{
        const item="Sponge";
        const price=10;
        orderManagement.addOrder(item, price);
        const spy=jest.spyOn(calculator, "calculateTotalRevenue");
        spy.mockReturnValue(10);
        //Act
        const totalRevenue=orderManagement.getTotalRevenue();

        //Assert
        expect(totalRevenue).toBe(10);
        expect(spy).toHaveBeenCalledWith(orderManagement.getOrders());
        expect(spy).toHaveBeenNthCalledWith(1, [{id:1, item, price}]);
        expect(spy).toHaveNthReturnedWith(1, 10);
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
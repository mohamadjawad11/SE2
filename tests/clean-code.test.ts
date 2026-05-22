import {FinanceCalculator, OrderManagement, Validator} from "../src/cleanCode";
import { CakeBuilder } from "../src/model/builders/cake.builder";
import { ToyBuilder } from "../src/model/builders/toy.builder";
import { BookBuilder } from "../src/model/builders/book.builder";

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

describe("Models Builder(builder pattern)",()=>{
    it("should build a cake",()=>{
        
        //Arrange
        const cakeBuilder=new CakeBuilder();
        const cake=cakeBuilder.setType("Birthday")
        .setFlavor("Chocolate")
        .setFilling("Cream")
        .setSize("Medium")
        .setLayers("2")
        .setFrostingType("Buttercream")
        .setFrostingFlavor("Vanilla")
        .setDecorationType("Sprinkles")
        .setDecorationColor("Rainbow")
        .setCustomMessage("Happy Birthday!")
        .setShape("Round")
        .setAllergies("None")
        .setSpecialIngredients("None")
        .setPackagingType("Box")
        .setPrice(50)
        .setQuantity(1)
        .build();

        //Assert
        expect(cake).toEqual({
            type:"Birthday",
            flavor:"Chocolate",
            filling:"Cream",
            size:"Medium",
            layers:"2",
            frostingType:"Buttercream",
            frostingFlavor:"Vanilla",
            decorationType:"Sprinkles",
            decorationColor:"Rainbow",
            customMessage:"Happy Birthday!",
            shape:"Round",
            allergies:"None",
            specialIngredients:"None",
            packagingType:"Box",
            price:50,
            quantity:1
        });
    });

    it("should build a toy instance",()=>{
        //Arrange
        const toyBuilder=new ToyBuilder();
        const toy=toyBuilder.setType("Action Figure")
        .setAgeGroup(5)
        .setBrand("Hasbro")
        .setMaterial("Plastic")
        .setBatteryRequired(false)
        .setEducational(false)
        .setPrice(20)
        .setQuantity(2)
        .build();

        //Assert
        expect(toy).toEqual({
            type:"Action Figure",
            ageGroup:5,
            brand:"Hasbro",
            material:"Plastic",
            batteryRequired:false,
            educational:false,
            price:20,
            quantity:2
        });
    });

    it("should build a book instance",()=>{
        //Arrange
        const bookBuilder=new BookBuilder();
        const book=bookBuilder.setTitle("The Great Gatsby")
        .setAuthor("F. Scott Fitzgerald")
        .setGenre("Classic")
        .setFormat("Hardcover")
        .setLanguage("English")
        .setPublisher("Scribner")
        .setSpecialEdition("None")
        .setPackaging("Box")
        .setPrice(15)
        .setQuantity(3)
        .build();

        //Assert
        expect(book).toEqual({
            title:"The Great Gatsby",
            author:"F. Scott Fitzgerald",
            genre:"Classic",
            format:"Hardcover",
            language:"English",
            publisher:"Scribner",
            specialEdition:"None",
            packaging:"Box",
            price:15,
            quantity:3
        });
    });
});

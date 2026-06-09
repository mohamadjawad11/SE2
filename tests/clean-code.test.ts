import {FinanceCalculator, OrderManagement, Validator} from "../src/cleanCode";
import {CSVCakeMapper} from "../src/mappers/cake.mapper"
import {JSONBookMapper} from "../src/mappers/book.mapper";
import {XMLToyMapper} from "../src/mappers/toy.mapper";
import {CakeBuilder} from "../src/model/builders/cake.builder";
import {ToyBuilder} from "../src/model/builders/toy.builder";
import {BookBuilder} from "../src/model/builders/book.builder";
import {ItemCategory} from "../src/model/IItem";

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


describe("CSVCakeMapper", () => {
  it("maps CSV data to Cake correctly", () => {
    const data = [
      "1",
      "Birthday",
      "Chocolate",
      "Vanilla",
      "Large",
      "3",
      "Buttercream",
      "Strawberry",
      "Flowers",
      "Pink",
      "Happy Birthday",
      "Round",
      "Nuts",
      "Sprinkles",
      "Box",
      "25.5",
      "2"
    ];

    const cake = new CSVCakeMapper().map(data);

    expect(cake.getCategory()).toBe(ItemCategory.CAKE);
    expect(cake.getType()).toBe("Birthday");
    expect(cake.getFlavor()).toBe("Chocolate");
    expect(cake.getFilling()).toBe("Vanilla");
    expect(cake.getSize()).toBe("Large");
    expect(cake.getLayers()).toBe("3");
    expect(cake.getFrostingType()).toBe("Buttercream");
    expect(cake.getFrostingFlavor()).toBe("Strawberry");
    expect(cake.getDecorationType()).toBe("Flowers");
    expect(cake.getDecorationColor()).toBe("Pink");
    expect(cake.getCustomMessage()).toBe("Happy Birthday");
    expect(cake.getShape()).toBe("Round");
    expect(cake.getAllergies()).toBe("Nuts");
    expect(cake.getSpecialIngredients()).toBe("Sprinkles");
    expect(cake.getPackagingType()).toBe("Box");
    expect(cake.getPrice()).toBe(25.5);
    expect(cake.getQuantity()).toBe(2);
  });
});


describe("JSONBookMapper", () => {
  it("maps JSON data to Book correctly", () => {
    const jsonData = [
      "1",
      "The Great Gatsby",
      "F. Scott Fitzgerald",
      "Classic",
      "Hardcover",
      "English",
      "Scribner",
      "None",
      "Box",
      "15",
      "3"
    ];

    const book = new JSONBookMapper().map(jsonData);

    expect(book.getCategory()).toBe(ItemCategory.BOOK);
    expect(book.getTitle()).toBe("The Great Gatsby");
    expect(book.getAuthor()).toBe("F. Scott Fitzgerald");
    expect(book.getGenre()).toBe("Classic");
    expect(book.getFormat()).toBe("Hardcover");
    expect(book.getLanguage()).toBe("English");
    expect(book.getPublisher()).toBe("Scribner");
    expect(book.getSpecialEdition()).toBe("None");
    expect(book.getPackaging()).toBe("Box");
    expect(book.getPrice()).toBe(15);
    expect(book.getQuantity()).toBe(3);
  });
});


describe("XMLToyMapper", () => {
  it("maps XML data to Toy correctly", () => {
    const xmlData = [
      "1",
      "Action Figure",
      "5",
      "Hasbro",
      "Plastic",
      "No",
      "No",
      "20",
      "2"
    ];

    const toy = new XMLToyMapper().map(xmlData);

    expect(toy.getCategory()).toBe(ItemCategory.TOY);
    expect(toy.getType()).toBe("Action Figure");
    expect(toy.getAgeGroup()).toBe(5);
    expect(toy.getBrand()).toBe("Hasbro");
    expect(toy.getMaterial()).toBe("Plastic");
    expect(toy.isBatteryRequired()).toBe(false);
    expect(toy.isEducational()).toBe(false);
    expect(toy.getPrice()).toBe(20);
    expect(toy.getQuantity()).toBe(2);
  });
});

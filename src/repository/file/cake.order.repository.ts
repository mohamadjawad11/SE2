import { OrderRepository } from "./order.repository";
import { readCsvFile, writeCsvFile } from "../../utility/parser";
import { CSVOrderMapper } from "mappers/order.mapper";
import { CSVCakeMapper } from "mappers/cake.mapper";
import { IOrder } from "model/IOrder";


export class CakeOrderRepository extends OrderRepository {

   private mapper=new CSVOrderMapper(new CSVCakeMapper());

   constructor(private readonly filePath: string) {
         super();
     }

     async load():Promise<IOrder[]>{
        //read 2D array string from csv file and map it to IOrder array using CSVOrderMapper
        const csvData = await readCsvFile(this.filePath, true);
        //map csv data to IOrder array
        //map each row of csv data to IOrder using mapper
        return csvData.map(row => this.mapper.map(row));
        
     }

     async save(orders: IOrder[]):Promise<void>{
        //generate the list of headers for csv file
         const headers = ["ID", "Type", "Flavor", "Filling", "Size", "Layers", "FrostingType", "FrostingFlavor", "DecorationType",
                         "DecorationColor", "CustomMessage", "Shape", "Allergies", "SpecialIngredients",
                         "PackagingType", "Price", "Quantity"];
        //convert the orders to 2D string to add it to csv file so I use reverseMap not map
            const rows = orders.map(order => {
                return this.mapper.reverseMap(order);
            });
        // save the 2D array string to csv file
         await writeCsvFile(this.filePath, [headers, ...rows]);
     }
}
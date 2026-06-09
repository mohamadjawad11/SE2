import { Cake } from "../model/Cake.model";
import { IMapper } from "./IMapper";
import { CakeBuilder } from "../model/builders/cake.builder";

 
 export class CSVCakeMapper implements IMapper<string[],Cake>{
     map(data:string[]):Cake{
        //create a cake
        return CakeBuilder.create()
                   .setType(data[1])
                   .setFlavor(data[2])
                   .setFilling(data[3])
                   .setSize((data[4]))
                   .setLayers(data[5])
                   .setFrostingType(data[6])
                   .setFrostingFlavor(data[7])
                   .setDecorationType(data[8])
                   .setDecorationColor(data[9])
                   .setCustomMessage(data[10])
                   .setShape(data[11])
                   .setAllergies(data[12])
                   .setSpecialIngredients(data[13])
                   .setPackagingType(data[14])
                   .setPrice(Number(data[15]))
                   .setQuantity(Number(data[16]))
                   .build();
     }

        reverseMap(item:Cake):string[]{
            return [
                item.getType(),
                item.getFlavor(),
                item.getFilling(),
                item.getSize(),
                item.getLayers(),
                item.getFrostingType(),
                item.getFrostingFlavor(),
                item.getDecorationType(),
                item.getDecorationColor(),
                item.getCustomMessage(),
                item.getShape(),
                item.getAllergies(),
                item.getSpecialIngredients(),
                item.getPackagingType(),
                String(item.getPrice()),
                String(item.getQuantity())
            ]
        }
 }

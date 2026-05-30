import { Toy } from "../model/Toy.model";
import { IMapper } from "./IMapper";
import { ToyBuilder } from "../model/builders/toy.builder";




export class XMLToyMapper implements IMapper<string[],Toy>{
    map(data: string[]): Toy {
        return ToyBuilder.create()
                         .setType(data[1])
                         .setAgeGroup(parseInt(data[2]))
                         .setBrand(data[3])
                         .setMaterial(data[4])
                         .setBatteryRequired(data[5].trim().toLowerCase() === "yes")
                         .setEducational(data[6].trim().toLowerCase() === "yes")
                         .setPrice(parseInt(data[7]))
                         .setQuantity(parseInt(data[8]))
                         .build();

    }
}
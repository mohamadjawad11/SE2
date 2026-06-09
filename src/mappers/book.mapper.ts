import { Book } from "../model/Book.model";
import { IMapper } from "./IMapper";
import { BookBuilder } from "../model/builders/book.builder";



export class JSONBookMapper implements IMapper<string[],Book>{
    map(data:string[]):Book{
        //create a book
        return BookBuilder.create()
                          .setTitle(data[1])
                          .setAuthor(data[2])
                          .setGenre(data[3])
                          .setFormat(data[4])
                          .setLanguage(data[5])
                          .setPublisher(data[6])
                          .setSpecialEdition(data[7])
                          .setPackaging(data[8])
                          .setPrice(parseInt(data[9]))
                          .setQuantity(parseInt(data[10]))
                          .build();

    }

    reverseMap(item: Book): string[] {
        return [item.getTitle(),item.getAuthor(),item.getGenre(),item.getFormat(),item.getLanguage(),item.getPublisher(),String(item.getSpecialEdition()),item.getPackaging(),
                String(item.getPrice()),String(item.getQuantity())];
    }

}

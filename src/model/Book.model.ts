import { Item, ItemCategory } from "./Item.model";

export class Book implements Item {

     constructor(
        private  title: string,
        private  author: string,
        private  genre: string,
        private  format: string,
        private  language: string,
        private  publisher: string,
        private  specialEdition: string,
        private  packaging: string,
        private  price: number,
        private  quantity: number
    ) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.format = format;
        this.language = language;
        this.publisher = publisher;
        this.specialEdition = specialEdition;
        this.packaging = packaging;
        this.price = price;
        this.quantity = quantity;
    }

    getCategory(): ItemCategory {
        return ItemCategory.BOOK;
    }

    public getTitle(): string {
        return this.title;
    }

    public getAuthor(): string {
        return this.author;
    }

    public getGenre(): string {
        return this.genre;
    }

    public getFormat(): string {
        return this.format;
    }

    public getLanguage(): string {
        return this.language;
    }

    public getPublisher(): string {
        return this.publisher;
    }

    public getSpecialEdition(): string {
        return this.specialEdition;
    }

    public getPackaging(): string {
        return this.packaging;
    }

    public getPrice(): number {
        return this.price;
    }

    public getQuantity(): number {
        return this.quantity;
    }
}
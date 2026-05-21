import { Item, ItemCategory } from "./Item.model";


export class Cake implements Item{


    getCategory(): ItemCategory {
        return ItemCategory.CAKE;
    }

    // Properties with example default values
    private type: string = "Sponge";
    private flavor: string = "Vanilla";
    private filling: string = "Cream";
    private size: string = "20";
    private layers: string = "2";
    private frostingType: string = "Buttercream";
    private frostingFlavor: string = "Vanilla";
    private decorationType: string = "Sprinkles";
    private decorationColor: string = "Multi-color";
    private customMessage: string = "Happy Birthday";
    private shape: string = "Round";
    private allergies: string = "Nut-Free";
    private specialIngredients: string = "Organic Ingredients";
    private packagingType: string = "Standard Box";
    private price: number = 50;
    private quantity: number = 1;

    // Getters
    getType(): string { return this.type; }
    getFlavor(): string { return this.flavor; }
    getFilling(): string { return this.filling; }
    getSize(): string { return this.size; }
    getLayers(): string { return this.layers; }
    getFrostingType(): string { return this.frostingType; }
    getFrostingFlavor(): string { return this.frostingFlavor; }
    getDecorationType(): string { return this.decorationType; }
    getDecorationColor(): string { return this.decorationColor; }
    getCustomMessage(): string { return this.customMessage; }
    getShape(): string { return this.shape; }
    getAllergies(): string { return this.allergies; }
    getSpecialIngredients(): string { return this.specialIngredients; }
    getPackagingType(): string { return this.packagingType; }
    getPrice(): number { return this.price; }
    getQuantity(): number { return this.quantity; }

}
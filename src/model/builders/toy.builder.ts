import logger from "../../utility/logger";
import { Toy } from "../Toy.model";

export class ToyBuilder{
     private type!: string;
    private ageGroup!: number;
    private brand!: string;
    private material!: string;
    private batteryRequired!: boolean;
    private educational!: boolean;
    private price!: number;
    private quantity!: number;

    setType(type: string): ToyBuilder {
        this.type = type;
        return this;
    }

    setAgeGroup(ageGroup: number): ToyBuilder {
        this.ageGroup = ageGroup;
        return this;
    }

    setBrand(brand: string): ToyBuilder {
        this.brand = brand;
        return this;
    }

    setMaterial(material: string): ToyBuilder {
        this.material = material;
        return this;
    }

    setBatteryRequired(batteryRequired: boolean): ToyBuilder {
        this.batteryRequired = batteryRequired;
        return this;
    }

    setEducational(educational: boolean): ToyBuilder {
        this.educational = educational;
        return this;
    }

    setPrice(price: number): ToyBuilder {
        this.price = price;
        return this;
    }

    setQuantity(quantity: number): ToyBuilder {
        this.quantity = quantity;
        return this;
    }

    build(): Toy {
        const requiredProperties = [
            this.type,
            this.ageGroup,
            this.brand,
            this.material,
            this.batteryRequired,
            this.educational,
            this.price,
            this.quantity
        ];

        for (const prop of requiredProperties) {
            if (prop === undefined) {
                logger.error("Missing required property for Toy: " + prop);
                throw new Error("Missing required property for Toy");
            }
        }

        return new Toy(
            this.type,
            this.ageGroup,
            this.brand,
            this.material,
            this.batteryRequired,
            this.educational,
            this.price,
            this.quantity
        );
    }
}

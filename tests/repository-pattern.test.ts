import { IOrder } from "../src/model/IOrder";
import { IItem, ItemCategory } from "../src/model/IItem";
import { ID } from "../src/repository/IRepository";
import { OrderRepository } from "../src/repository/file/order.repository";
import { InvalidItem, ItemNotFound } from "../src/utility/exceptions/RepositoryExceptions";

class TestOrder implements IOrder {
    constructor(
        private readonly id: string,
        private readonly item: IItem,
        private readonly price: number,
        private readonly quantity: number,
    ) {}

    getItem(): IItem {
        return this.item;
    }

    getPrice(): number {
        return this.price;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getID(): string {
        return this.id;
    }
}

class InMemoryOrderRepository extends OrderRepository {
    constructor(private orders: IOrder[] = []) {
        super();
    }

    async load(): Promise<IOrder[]> {
        return [...this.orders];
    }

    async save(orders: IOrder[]): Promise<void> {
        this.orders = [...orders];
    }
}

const testItem: IItem = {
    getCategory: () => ItemCategory.CAKE,
};

const createOrder = (id: string, price = 25, quantity = 1): IOrder => {
    return new TestOrder(id, testItem, price, quantity);
};

const createId = (id: string): ID => {
    return { getID: () => id };
};

describe("OrderRepository repository pattern", () => {
    it("gets all orders from the storage implementation", async () => {
        const firstOrder = createOrder("1");
        const secondOrder = createOrder("2", 40, 2);
        const repository = new InMemoryOrderRepository([firstOrder, secondOrder]);

        await expect(repository.getAll()).resolves.toEqual([firstOrder, secondOrder]);
    });

    it("gets an order by id", async () => {
        const firstOrder = createOrder("1");
        const secondOrder = createOrder("2");
        const repository = new InMemoryOrderRepository([firstOrder, secondOrder]);

        await expect(repository.getById(createId("2"))).resolves.toBe(secondOrder);
    });

    it("throws ItemNotFound when getting an unknown order id", async () => {
        const repository = new InMemoryOrderRepository([createOrder("1")]);

        await expect(repository.getById(createId("999"))).rejects.toThrow(ItemNotFound);
    });

    it("creates a new order and persists it through save", async () => {
        const repository = new InMemoryOrderRepository([createOrder("1")]);
        const newOrder = createOrder("2", 55, 3);

        const createdId = await repository.create(newOrder);

        expect(createdId.getID()).toBe("2");
        await expect(repository.getAll()).resolves.toEqual([createOrder("1"), newOrder]);
    });

    it("throws InvalidItem when creating an invalid order", async () => {
        const repository = new InMemoryOrderRepository();

        await expect(repository.create(null as unknown as IOrder)).rejects.toThrow(InvalidItem);
    });

    it("updates an existing order", async () => {
        const originalOrder = createOrder("1", 25, 1);
        const updatedOrder = createOrder("1", 60, 2);
        const repository = new InMemoryOrderRepository([originalOrder]);

        await expect(repository.update(updatedOrder)).resolves.toBe(updatedOrder);
        await expect(repository.getById(createId("1"))).resolves.toBe(updatedOrder);
    });

    it("throws ItemNotFound when updating an unknown order", async () => {
        const repository = new InMemoryOrderRepository([createOrder("1")]);

        await expect(repository.update(createOrder("999"))).rejects.toThrow(ItemNotFound);
    });

    it("deletes an existing order", async () => {
        const firstOrder = createOrder("1");
        const secondOrder = createOrder("2");
        const repository = new InMemoryOrderRepository([firstOrder, secondOrder]);

        await repository.delete(createId("1"));

        await expect(repository.getAll()).resolves.toEqual([secondOrder]);
    });

    it("throws ItemNotFound when deleting an unknown order", async () => {
        const repository = new InMemoryOrderRepository([createOrder("1")]);

        await expect(repository.delete(createId("999"))).rejects.toThrow(ItemNotFound);
    });

    it("throws InvalidItem when deleting with an invalid id", async () => {
        const repository = new InMemoryOrderRepository();

        await expect(repository.delete(null as unknown as ID)).rejects.toThrow(InvalidItem);
    });
});

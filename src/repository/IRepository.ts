
export interface ID {
    //better for reusability
    getID(): string;
}

export interface IRepository<T extends ID> {
    getAll(): Promise<T[]>;
    getById(id: ID): Promise<T | null>;
    create(item: T): Promise<ID>;
    update(item: T): Promise<T | null>;
    delete(id: ID): Promise<void>;
}
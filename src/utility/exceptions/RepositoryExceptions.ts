
export class ItemNotFound extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ItemNotFound";
    }
}

export class DuplicateItem extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DuplicateItem";
    }
}

export class InvalidItem extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidItem";
    }
}

export class RepositoryError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RepositoryError";
    }
}
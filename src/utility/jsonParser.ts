import * as fs from "fs";

export class JsonParser {

    // Read JSON file and convert to JavaScript object
    parse<T>(filePath: string): T {
        try {
            const data = fs.readFileSync(filePath, "utf-8");
            return JSON.parse(data) as T;
        } catch (error) {
            console.error(`Error reading or parsing JSON file at ${filePath}:`, error);
            throw error;
        }
    }
}





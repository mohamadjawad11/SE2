import * as fs from "fs";
import { XMLParser } from "fast-xml-parser";

export class XmlParser {
  private parser: XMLParser;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
  }

  parse<T>(filePath: string): T {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      return this.parser.parse(data) as T;
    } catch (error) {
        console.error(`Error reading or parsing XML file at ${filePath}:`, error);
        throw error;
    }
  }
}
import { promises as fs } from 'fs';

// This module handles JSON files by converting them
// to and from a 2D string array.

export async function readJsonFile(
  filePath: string
): Promise<string[][]> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');

    const jsonData = JSON.parse(fileContent);

    // Expected JSON format:
    // [
    //   { "name": "John", "age": 25 },
    //   { "name": "Jane", "age": 30 }
    // ]

    if (!Array.isArray(jsonData)) {
      throw new Error('JSON data must be an array');
    }

    if (jsonData.length === 0) {
      return [];
    }

    const headers = Object.keys(jsonData[0]);

    const data: string[][] = [];

    // Add headers row
    data.push(headers);

    // Add values rows
    for (const item of jsonData) {
      const row = headers.map((header) =>
        String(item[header] ?? '')
      );

      data.push(row);
    }

    return data;
  } catch (error) {
    console.error(`Error reading JSON file ${filePath}:`, error);
    throw error;
  }
}

export async function writeJsonFile(
  filePath: string,
  data: string[][]
): Promise<void> {
  try {
    if (data.length === 0) {
      await fs.writeFile(filePath, '[]', 'utf-8');
      return;
    }

    const headers = data[0];

    const jsonArray = data.slice(1).map((row) => {
      const obj: Record<string, string> = {};

      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });

      return obj;
    });

    const jsonContent = JSON.stringify(jsonArray, null, 2);

    await fs.writeFile(filePath, jsonContent, 'utf-8');
  } catch (error) {
    console.error(`Error writing JSON file ${filePath}:`, error);
    throw error;
  }
}
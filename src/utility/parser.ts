import { promises as fs } from 'fs';
import {parse as csvParse} from 'csv-parse';
import { stringify as csvStringify } from 'csv-stringify';

//the role of this module is to handle the parsing of csv files, both reading and writing.
//It provides two main functions: readCsvFile and writeCsvFile. The readCsvFile function reads
// a CSV file from the specified file path and returns its content as a 2D array of strings.
// The writeCsvFile function takes a 2D array of strings and writes it to a CSV file at the
// specified file path. Both functions handle errors gracefully by logging them and rethrowing
// them for further handling.


export async function readCsvFile(filePath: string, includeHeaders: boolean=false): Promise<string[][]> {
  try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return new Promise((resolve, reject) => {
          csvParse(fileContent,{
            trim: true,
            skip_empty_lines: true,
            
          }, (err, records: string[][] | undefined) => {
            if (err) {
              reject(err);
                if(!includeHeaders && records && records.length > 0) {
                    records.shift(); // Remove the header row
                }
            } else {
              resolve(records || []);
            }
          })
        });
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
}

export async function writeCsvFile(filePath: string, data: string[][]): Promise<void> {
 try {       const csvContent = await new Promise<string>((resolve, reject) => {
          csvStringify(data, (err, output) => {
            if (err) {
              reject(err);
            } else {
              resolve(output);
            }
          });
        });
        await fs.writeFile(filePath, csvContent, 'utf-8');
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    throw error;
  }
}



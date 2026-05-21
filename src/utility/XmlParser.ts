import { promises as fs } from 'fs';
import { parseStringPromise, Builder } from 'xml2js';

// This module handles XML files by converting them
// to and from a 2D string array.

export async function readXmlFile(filePath: string): Promise<string[][]> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');

    const result = await parseStringPromise(fileContent, {
      explicitArray: false,
      trim: true,
    });

    const rows = result.rows?.row ?? result.data?.row;

    const data: string[][] = [];

    if (!rows) {
      return data;
    }

    const rowArray = Array.isArray(rows) ? rows : [rows];

    for (const row of rowArray) {
      const cells = row.cell;

      if (Array.isArray(cells)) {
        data.push(cells.map((cell) => String(cell)));
      } else if (cells !== undefined) {
        data.push([String(cells)]);
      } else {
        data.push(Object.values(row).map((cell) => String(cell)));
      }
    }

    return data;
  } catch (error) {
    console.error(`Error reading XML file ${filePath}:`, error);
    throw error;
  }
}

export async function writeXmlFile(
  filePath: string,
  data: string[][]
): Promise<void> {
  try {
    const xmlObject = {
      rows: {
        row: data.map((row) => ({
          cell: row,
        })),
      },
    };

    const builder = new Builder({
      xmldec: {
        version: '1.0',
        encoding: 'UTF-8',
      },
      renderOpts: {
        pretty: true,
      },
    });

    const xmlContent = builder.buildObject(xmlObject);

    await fs.writeFile(filePath, xmlContent, 'utf-8');
  } catch (error) {
    console.error(`Error writing XML file ${filePath}:`, error);
    throw error;
  }
}

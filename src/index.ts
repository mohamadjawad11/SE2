import logger from "./utility/logger";
import { readCsvFile } from "./utility/parser";


async function main() {
  try {
    const data = await readCsvFile('data/cake orders.csv', true);
    data.forEach(row => {
      logger.info(row);
    });
  } catch (error) {
    logger.error('Error reading CSV file:', error);
  }
}

main();





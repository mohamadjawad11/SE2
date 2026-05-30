import { CSVOrderMapper } from "mappers/order.mapper";
import { CSVCakeMapper } from "./mappers/cake.mapper";
import logger from "./utility/logger";
import { readCsvFile } from "./utility/parser";

async function main() {

  const data=await readCsvFile("data/cake orders.csv");
  const cakeMapper=new CSVCakeMapper();
  const orderMapper=new CSVOrderMapper(cakeMapper);
  const orders=data.map(r=>orderMapper.map(r));
  logger.info("List of orders: \n %o", orders);


}

main();




import { OrderMapper } from "./mappers/order.mapper";
import { CSVCakeMapper } from "./mappers/cake.mapper";
import logger from "./utility/logger";
import { readCsvFile } from "./utility/parser";
import { readJsonFile } from "./utility/jsonParser";
import { JSONBookMapper } from "./mappers/book.mapper";
import { readXmlFile } from "./utility/XmlParser";
import { XMLToyMapper } from "./mappers/toy.mapper";

async function main() {

  const data=await readCsvFile("data/cake orders.csv");
  const cakeMapper=new CSVCakeMapper();
  const CakeOrderMapper=new OrderMapper(cakeMapper);
  const CakeOrders=data.map(r=>CakeOrderMapper.map(r));
  logger.info("List of orders: \n %o", CakeOrders);

  const Bookdata=await readJsonFile("data/book orders.json");
  const bookMapper=new JSONBookMapper();
  const BookOrderMapper=new OrderMapper(bookMapper);
  const Bookorders=Bookdata.map(r=>BookOrderMapper.map(r));
  logger.info("List of orders: \n %o", Bookorders);


  const ToyData=await readXmlFile("data/toy orders.xml");
  const toyMapper=new XMLToyMapper();
  const ToyOrderMapper=new OrderMapper(toyMapper);
  const ToyOrders=ToyData.map(r=>ToyOrderMapper.map(r));
  logger.info("List of orders: \n %o", ToyOrders);
  



}

main();

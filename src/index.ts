import logger from "./utility/logger";
import {
  OrderManagement,
  Validator,
  FinanceCalculator
} from "./cleanCode";

const validator = new Validator();
const financeCalculator = new FinanceCalculator();

const orderManagement = new OrderManagement(
  validator,
  financeCalculator
);

// Add orders
orderManagement.addOrder("Sponge", 10);
orderManagement.addOrder("Chocolate", 20);
orderManagement.addOrder("Coffee", 15);

// Get all orders
logger.info("All Orders", { orders: orderManagement.getOrders() });
console.log();


// Total revenue
logger.info("Total Revenue:"+orderManagement.getTotalRevenue());

// Average buy power
logger.info("Average Buy Power:"+orderManagement.getAverageBuyPower());
console.log();

// Fetch order by ID
logger.info("Order with ID 1:", { order: orderManagement.fetchOrderById(1) });

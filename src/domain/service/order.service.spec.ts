import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order_service";

describe("Order service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer("1", "John Doe");
        const orderItem = new OrderItem("1", "1", "item 1", 100, 2);

        const order = OrderService.placeOrder(customer, [orderItem]);

        expect(customer.rewardPoints).toBe(100);
        expect(order.total()).toBe(200);
    });
    it("should get total of all orders", () => {
        const OrderItem1 = new OrderItem("1", "1", "item 1", 100, 2);
        const OrderItem2 = new OrderItem("2", "1", "item 2", 200, 2);

        const order = new Order("1", "1", [OrderItem1]);
        const order2  = new Order("2","2",[OrderItem2]);

        const total = OrderService.total([order,order2]);

        expect(total).toBe(600);
        
    });
});
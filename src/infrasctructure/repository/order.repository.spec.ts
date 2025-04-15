import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import ProductModel from "../db/sequelize/model/product.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/customer/value-object/address";
import Customer from "../../domain/customer/entity/customer";
import ProductRepository from "./product.repository";
import Product from "../../domain/product/entity/product";
import OrderItem from "../../domain/checkout/entity/order_item";
import Order from "../../domain/checkout/entity/order";
import OrderRepository from "./order.repository";
import OrderModel from "../db/sequelize/model/order.model";

describe("Order repository unit tests", () => {
    let sequelize: Sequelize;
    
        beforeEach(async () => {
            sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: ':memory:',
                logging: false,
                sync: { force: true }
            });
            sequelize.addModels([CustomerModel,ProductModel,OrderItemModel,OrderModel]);
            await sequelize.sync();    
        });
    
        afterEach( async () => {
            await sequelize.close();
        });

        const createNewOrder = async () => {

            const customerRepository = new CustomerRepository();
            const address = new Address("Street 1", 1, "Zipcode", "City");
            const customer = new Customer("123", "John");

            customer.Address = address;
            await customerRepository.create(customer);

            const productRepository = new ProductRepository();
            const product = new Product("123", "Product 1", 10);
            await productRepository.create(product);

            const orderItem = new OrderItem("1",product.id, product.name, product.price, 2);


            const order = new Order("123", "123", [orderItem]);
            const orderRepository = new OrderRepository();

            await orderRepository.create(order);

            return order;
        }

        it("Should create new order ", async () =>{
            const order = await createNewOrder();
            const orderModel = await OrderModel.findOne({
                where: {
                    id: order.id
                },
                include: [
                    "items"
                ],
            });

            expect(orderModel).toMatchObject({
                id: "123",
                customer_id: "123",
                total: order.total(),
                items: [
                    {
                        id: "1",
                        product_id: order.items[0].productId,
                        order_id: "123",
                        quantity: order.items[0].quantity,
                        name: order.items[0].name,
                        price: order.items[0].price

                    }
                ]
            })

        });

        it("Should update order", async () => {
            const order = await createNewOrder();
            const orderRepository = new OrderRepository();
            order.items.push( new OrderItem("3", "123", "Product 35", 10, 2));
            await orderRepository.update(order);
            const orderModel = await OrderModel.findOne({
                where: {
                    id: order.id
                },
                include: [
                    "items"
                ],
            });

            expect(orderModel).toMatchObject({
                id: "123",
                customer_id: "123",
                total: order.total(),
                items: [
                    {
                        id: "1",
                        product_id: order.items[0].productId,
                        order_id: "123",
                        quantity: order.items[0].quantity,
                        name: order.items[0].name,
                        price: order.items[0].price

                    },
                    {
                        id: "3",
                        product_id: order.items[1].productId,
                        order_id: "123",
                        quantity: order.items[1].quantity,
                        name: order.items[1].name,
                        price: order.items[1].price

                    }
                ]
            })
        });
});
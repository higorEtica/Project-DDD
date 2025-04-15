import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/customer/value-object/address";
import Customer from "../../domain/customer/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe('CustomerRepository', () => {

        let sequelize: Sequelize;
    
        beforeEach(async () => {
            sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: ':memory:',
                logging: false,
                sync: { force: true }
            });
            sequelize.addModels([CustomerModel]);
            await sequelize.sync();    
        });
    
        afterEach( async () => {
            await sequelize.close();
        });

    it('should create a new customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John Doe");
        const address = new Address("Street 1", 1 ,"Zipcode 1 ","City 1");
        customer.Address = address;
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });
        expect(customerModel.toJSON()).toStrictEqual({
            id:"123",
            name: customer.name,
            rewardPoints: customer.rewardPoints,
            active: customer.isActive(),
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city
        });
    });
});
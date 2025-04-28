import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () =>{
    it("should create a customer",() =>{
        let customer = CustomerFactory.create("Jonh");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Jonh");
        expect(customer.Address).toBeUndefined();
    });

    it("should create a customer with an adress ", () =>{
        const address = new Address("Street",1,"38205-256", "São Paulo");
        let  customer = CustomerFactory.createWithAddress("John",address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBe(address);
    })
})
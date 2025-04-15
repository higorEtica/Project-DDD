import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer", () => {

it("should get 1 as result ", () => {

    const result = 1;
    expect(result).toBe(1);

});


it("should throw error when id is empyt",() =>{
    expect(() => {
        let customer = new Customer("1235","");
    }).toThrowError("Name is required");
});


it("should change name",() =>{
    // Arrange
    const customer = new Customer("1235","John");

    // Act
    customer.changeName("Doe");

    // Assert
    expect(customer.name).toBe("Doe");
});

it("should acivate customer",() =>{
    
    const customer = new Customer("1","Customer 1");
    const addres = new Address("Street 1",1,"City 1","12345");
    customer.Address = addres;

    customer.activate();

    expect(customer.isActive()).toBe(true);
});


it("should deactovate customer",() =>{
    
    const customer = new Customer("1","Customer 1");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
});

it("should throw error when addresss is undefined when you activate a customer",() =>{
    expect(() => {
        const customer = new Customer("1","Customer 1");
        customer.activate();
    }).toThrowError("Address is required");
});

});
import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit test", () => {

    it("should get 1 as result ", () => {

        const result = 1;
        expect(result).toBe(1);

    });

    it("should throw error when id is empyt",() =>{
        expect(() => {
            let order = new Order("","",[]);
        }).toThrowError("Id is required");
    });

    it("should throw error when customerid is empyt",() =>{
        expect(() => {
            let order = new Order("1324","",[]);
        }).toThrowError("CustomerId is required");
    });

    it("should throw error when customerid is empyt",() =>{
        expect(() => {
            let order = new Order("1324","",[]);
        }).toThrowError("CustomerId is required");
    });

    it("should throw error when item is empyt",() =>{
        expect(() => {
            let order = new Order("1324","2344",[]);
        }).toThrowError("Items are required");
    });


    it("should calculate total ",() =>{
        const item = new OrderItem("i1","1","item 1",100,2);
        const item2 = new OrderItem("i1","1","item 1",200,2);

        const order = new Order("1324","2344",[item,item2]);
        
        const total = order.total();

        expect(total).toBe(600);
    });


    it("should throw error if the item qtd is less or equal zero ",() =>{
        
        expect(()=>{
            const item = new OrderItem("i1","1","item 1",100,0);
            const order = new Order("1324","2344",[item]);
            
        }).toThrowError("Quantity must be greater than 0")
    });

});
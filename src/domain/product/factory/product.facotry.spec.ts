import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {
    it("Should create a prodcut type a ", () =>{
         const product = ProductFactory.create("a","Product A",1);
         
         expect(product.id).toBeDefined();
         expect(product.name).toBe("Product A");
         expect(product.price).toBe(1);
         expect(product.constructor.name).toBe("Product")
    });


    it("Should create a prodcut type b ", () =>{
        const product = ProductFactory.create("b","Product B",1);
        
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(2);
        expect(product.constructor.name).toBe("ProductB")
   });

   it("should throw an error when product type is not supported ", () =>{
    try{
        const product = ProductFactory.create("c","Product C",1);
    }catch(e){
        expect((e as Error).message).toBe("Product type not supported");
    }
    //OR
    expect(() =>{
        ProductFactory.create("c","Product C",1);
    }).toThrow("Product type not supported")
    
});
});
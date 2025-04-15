import Product from "./product";

describe("Product unit test", () => {

    it("should throw error when id is empty ", () => {
        expect(() => {
            const product = new Product("", "Product 1", 100);

            expect(product).toThrowError("Id is required");
        });

    });


    it("should throw error when name is empty ", () => {
        expect(() => {
            const product = new Product("154", "", 100);

            expect(product).toThrowError("Name is required");
        });

    });


    it("should throw error when price is empty ", () => {
        expect(() => {
            const product = new Product("154", "asdfadf", 0);

            expect(product).toThrowError("Price is required");
        });

    });

    it("should change name", () =>{
        // Arrange
        const product = new Product("1235","Product 1",100);

        // Act
        product.changeName("Product 2");

        // Assert
        expect(product.name).toBe("Product 2");
    });

    it("should change price", () =>{
        // Arrange
        const product = new Product("1235","Product 1",100);

        // Act
        product.changePrice(200);

        // Assert
        expect(product.price).toBe(200);
    });

});
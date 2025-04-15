import Product from "../entity/product";
import ProductService from "./product_service";

describe("Product service unit tests", () =>{

    it("should change the prices of all products", () => {

        const product1 = new Product("1", "Product 1", 100);
        const product2 = new Product("2", "Product 2", 200);
        const productList = [product1, product2];

        ProductService.increasePrice(productList, 10);

        expect(product1.price).toBe(110);
        expect(product2.price).toBe(220);
    });
})
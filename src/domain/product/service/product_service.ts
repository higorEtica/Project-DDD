import Product from "../entity/product";

export default class ProductService {
    static increasePrice(productList: Product[], percentage: number) : Product[] {
        productList.forEach(product => {
            product.changePrice((product.price * percentage)/100 + product.price);
        });

        return productList
    }
}
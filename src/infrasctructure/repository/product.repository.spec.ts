import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import Product from "../../domain/product/entity/product";

describe("Product repository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();    
    });

    afterEach( async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        
        await productRepository.create(product);
        
        const productModel = await ProductModel.findOne({where: {id: "1"}});

        expect(productModel.toJSON()).toMatchObject({
            id: "1",
            name: "Product 1",
            price: 100
        });
    });
    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);
        product.changePrice(200);
        product.changeName("Product 2");
        await productRepository.update(product);
        const productModel = await ProductModel.findOne({where: {id: "1"}});
        expect(productModel.toJSON()).toMatchObject({
            id: "1",
            name: "Product 2",
            price: 200
        });
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);
        const productModel = await ProductModel.findOne({where: {id: "1"}});
        const productFound = await productRepository.find("1");
        expect(productModel.toJSON()).toMatchObject({
            id: productFound.id,
            name: productFound.name,
            price: productFound.price
        });
    });

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product("1", "Product 1", 100);
        const product2 = new Product("2", "Product 2", 200);
        await productRepository.create(product1);
        await productRepository.create(product2);
        const products = await productRepository.findAll();

        const producFounds = [product1,product2];
        expect(products).toMatchObject(producFounds);
        expect(products.length).toBe(2);
    }
    );
});
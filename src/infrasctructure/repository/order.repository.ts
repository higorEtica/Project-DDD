import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order-repostiory-interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class orderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id : item.productId,
                quantity: item.quantity
            })),
            total: entity.total()
        },{
            include: [
                {
                    model: OrderItemModel
                }
            ]
        });
    }
    async update(entity: Order): Promise<void> {
        await OrderModel.update({
            customer_id: entity.customerId,
            total: entity.total()
        }, { where: { id: entity.id } });
        
        // Remove todos os itens antigos
        await OrderItemModel.destroy({
            where: { order_id: entity.id }
        });

        // Adiciona os novos itens
        for (const item of entity.items) {
            await OrderItemModel.create({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                order_id: entity.id
            });
        }
    }
    async find(id: String): Promise<Order> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }
    
}
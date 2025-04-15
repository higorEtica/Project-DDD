import Customer from "../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../domain/customer/repository/customer-repository-interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface{

    async create( entity: Customer ): Promise<void>{
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipcode: entity.Address.zip,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        });
    }
    async update(entity: Customer): Promise<void>{

    }
    async find(id:String): Promise<Customer>{
        return null;
    }
    async findAll():Promise<Customer[]>{
        return [];
    }

}
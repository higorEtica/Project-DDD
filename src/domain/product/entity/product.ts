import ProductInterface from "./product.interface";

export default class Product  implements ProductInterface{

    private _id:string;
    private _name:string;
    private _price:number;

    constructor(id:string,name:string,price:number){
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    validate(){
        if(this._id.length === 0 ){
            throw new Error("Id is required");
        }

        if(this._name.length === 0 ){
            throw new Error("Name is required");
        }

        if(this._price === 0 || this._price < 0){
            throw new Error("Price is required");
        }
    }

    get id(): string{
        return this._id;
    }

    get name(): string{
        return this._name;
    }

    get price(): number{
        return this._price;
    }

    changePrice(price:number){
        this.validate();
        this._price = price;
    }

    changeName(name:string){
        this.validate();
        this._name = name;
    }

}
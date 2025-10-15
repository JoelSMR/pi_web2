import { Product } from "@/app/modules/Dashboard/Renders/Products/Models/ProductModels";
import {  ProductToEditProduct } from "../util/Mappers/ProductMappers";
import { axiosProductInstance } from "./AxiosServiceFactory";

export default class ProductService{
    private static api=axiosProductInstance

    static async createProduct(newProductData:{nPrice:number,nName:string,nDescription:string,nCategory:string}){
        try{
            const response = await this.api.post("/crearProducto",{newProductData});
            return response.data
        }catch(e:unknown){
            console.log(e||"Error en CrearProducto");
        }
    }

    static async getAllProducts(){
        try{
            const response = await this.api.get("/");
            const p:Product[] =  [{id:1,price:2,category:"Categoria",description:"HolaDesdeAPI",name:"Pedro"},{id:1,price:2,category:"Categoria4",description:"Hola",name:"Pedro"}]
            return response.data??[]

        }catch(e:unknown){
            console.log(e || "Error en getAll");
            return []
        }
    }

    static async getProductById(id:number){
        try{
        const response= await this.api.get("/"+id.toString())
        return response.data
        }
        catch(e:unknown){console.log(e || "Error en getById");            
        }
    }

    static async updateProductByid(id:number,nProduct:Product){
        try{
        const nEditableProduct = await ProductToEditProduct(nProduct);
        const response = await this.api.put("/"+id.toString(),nEditableProduct);
        return response
        }catch(error){console.error(error)}
    }

    static async deleteProductById(id:number){
        try{
            const response = await this.api.delete("/"+id.toString())
            return response.data
        }catch(e:unknown){
            console.log(e || "Error deleteById");
        }
    }
}
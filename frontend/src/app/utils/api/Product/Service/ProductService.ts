import {  NewProductToCreate, Product } from "@/app/modules/Dashboard/Renders/Products/Models/ProductModels";
import { axiosProductInstance } from "../../ServiceFactory/AxiosServiceFactory";

/**
 * @Info
 * 
 * This Class Responsability is Managing The Fetch Logic
 * 
 * @Disclaimer
 * The methods are StaticClassMethod, dont instance the Class
 */
export default class ProductService{
    private static api=axiosProductInstance

    static async createProduct(product:NewProductToCreate){
        try{
            const response = await this.api.post("",product);
            return response.data
        }catch(e:unknown){
            console.log(e as Error||"Error en CrearProducto");
        }
    }

    static async getAllProducts(){
        try{
            const response = await this.api.get("");
            console.log("Fetch "+response);
            return response.data??[]

        }catch(e){ 
            console.log(e as Error || "Error en getAll");
            return []
        }
    }

    static async getProductById(id:number){
        try{
        const response= await this.api.get("/"+id)
        return response.data
        }
        catch(e){console.log(e as Error || "Error en getById");            
        }
    }

    static async updateProductByid(id:number,nProduct:Product){
        try{
        // const newProduct = await EditProductToProduct(nProduct);
        const response = await this.api.put("/"+id , nProduct);
        return response
        }catch(error){console.error(error as Error)}
    }

    static async deleteProductById(id:number){
        try{
            const response = await this.api.delete("/"+id)
            return response.data
        }catch(e){
            console.log(e as Error|| "Error deleteById");
        }
    }
}
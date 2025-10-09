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
            return response.data
        }catch(e:unknown){
            console.log(e || "Error en getAll");
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

    static async deleteProductById(id:number){
        try{
            const response = await this.api.delete("/"+id.toString())
            return response.data
        }catch(e:unknown){
            console.log(e || "Error deleteById");
        }
    }
}
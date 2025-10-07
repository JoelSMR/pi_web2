import { axiosProductInstance } from "./AxiosServiceFactory";

export default class ProductService{
    private static api=axiosProductInstance

    static async getAllProducts(){
        try{
            const response = await this.api.get("/");
            return response.data
        }catch(e:unknown){
            throw new Error(e.response?.data?.mensaje || "Error en getAll")
        }
    }

    static async getProductById(id:number){
        try{
        const response= await this.api.get("/"+id.toString())
        return response.data
        }
        catch(e:unknown){throw new Error(e.response?.data?.mensaje || "Error en getById")            
        }
    }

    static async deleteProductById(id:number){
        try{
            const response = await this.api.delete("/"+id.toString())
            return response.data
        }catch(e:unknown){
            throw new Error(e.response?.data?.mensaje? || "Error deleteById")
        }
    }
}
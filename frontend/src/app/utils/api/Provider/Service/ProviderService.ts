import { NewProviderToCreate, Provider } from "@/app/modules/Dashboard/Renders/Providers/Models/ProviderModels";
import { axiosProviderInstance } from "../../ServiceFactory/AxiosServiceFactory";
import { ProviderToEditProvider } from "../Mappers/ProviderMappers";
/**
 * @Info
 * 
 * This Class Responsability is Managing The Fetch Logic
 * 
 * @Disclaimer
 * The methods are StaticClassMethod, dont instance the Class
 */
export class ProviderService{
    private static api= axiosProviderInstance

    static createProvider = async(provider:NewProviderToCreate)=>{
        try{
            const response = await this.api.post("",provider); 
            return response.data
        }
        catch(e){console.log(e as Error || "Error en createProvider")}
        
    }

    static getAllProviders =async()=>{
        try{
        const response = await this.api.get("");
        return response.data?? [];
        }
        catch(e){console.log(e as Error || " Error en getAllProviders");return []}
    }

    static getProviderById=async(id:string|number)=>{
        try{
            const response = await this.api.get("/"+id);
            return response.data;
        }
        catch(e){console.log(e as Error || "Error en getProviderById")}
        
    }
    static updateProviderById=async(id:number,np:Provider)=>{
        try{
            const nEditableProvider = await ProviderToEditProvider(np) ;
            const response = await this.api.put(""+id , nEditableProvider)
            return response.data
        }
        catch(e){
            console.log(e as Error || " Error en updateProviderByID")
        }
    }
    static deleteProviderById=async(id:string|number)=>{
        try{
            const response = await this.api.delete("/"+id);
            return response.data
        }
        catch(e){console.log(e as Error || "Error en deleteProviderById")}
        

    }
    
}
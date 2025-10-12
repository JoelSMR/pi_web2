import { axiosProviderInstance } from "./AxiosServiceFactory";

export class ProviderService{
    private static api= axiosProviderInstance

    static getAllProviders =async()=>{
        const data = await this.api.get("/");
        return data.data;
    }

    static getProviderById=async(id:string|number)=>{
        const data = await this.api.get("/"+id.toString());
        return data.data;
    }

    static deleteProviderById=async(id:string|number)=>{
        const data = await this.api.delete("/"+id.toString());
        return data.data

    }
}
import { UserDB } from "@/app/modules/Auth/Models/LogInFormModels";
import { axiosAuthInstance } from "../../ServiceFactory/AxiosServiceFactory"

export class AuthService{
    private static api = axiosAuthInstance;

    static LogInUser= async(nombre:string, correo:string)=>{
       const response = await this.api.post("/checklogin",{nombre,correo})
       return response.data
    }

    LogOutUser=async()=>{
        
    }

    static createUser= async(userData:UserDB)=>{
        const response = await this.api.post("",userData)
        return response.data
    }

    CheckUserPrivilegies=async()=>{
        
    }
}
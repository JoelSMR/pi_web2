import { axiosAuthInstance } from "./AxiosServiceFactory"

export class AuthService{
    private static api = axiosAuthInstance;

    static LogInUser= async(username:string, password:string)=>{
       const response = await this.api.post("/Login",{username,password})
       return response.data
    }

    LogOutUser=async()=>{
        
    }

    CheckUserPrivilegies=async()=>{
        
    }
}
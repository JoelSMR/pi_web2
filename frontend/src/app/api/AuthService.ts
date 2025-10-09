import { axiosAuthInstance } from "./AxiosServiceFactory"

export class AuthService{
    private static api = axiosAuthInstance;

    static LogInUser= async()=>{
       const response = await this.api.get("/LogIn")
       return response.data
    }

    LogOutUser=async()=>{

    }

    CheckUserPrivilegies=async()=>{
        
    }
}
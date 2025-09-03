import { json } from "stream/consumers";
import { axiosUserInstance } from "./axiosInstances/axiosInstances";
import { stringify } from "querystring";

export default class UserService {
    private static api = axiosUserInstance;

    //Example Function
    /*
    static async changeMasterpass(masterpass: string): Promise<void> {
    await UserService.api.put('/change_masterpass', {
      masterpass
    }, { withCredentials: true }
    );
  };


   static async downloadData(){
    const response = await UserService.api.get('/download_data',{withCredentials:true,responseType:'blob'})
    const data = response.data
    return data
  };
    */
}
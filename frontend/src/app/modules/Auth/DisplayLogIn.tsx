import useLoader from '@/app/GlobalComponents/CustomHooks/useLoader';
import React from 'react'
import LogInForm from './Components/LogInForm';
import { AuthService } from '@/app/util/api/Service/AuthService';
import Router from 'next/router';

const DisplayLogIn = () => {
    const {ToggleLoaderOn,ToggleLoaderOff} = useLoader();
    const router = Router;    

    const handleLoginSubmit=async(username:string, password:string)=>{
      try{
      ToggleLoaderOn("Comprobando Inicio de Sesion...");
      const isRegistered = await AuthService.LogInUser(username,password);
      if (isRegistered) router.push("/modules/Dashboard/Renders/Products");
    }finally{
      ToggleLoaderOff();
    }
    }

  return (
    <React.Fragment>
        <LogInForm onSubmit={handleLoginSubmit} />
    </React.Fragment>
        
    
  )
}

export default DisplayLogIn
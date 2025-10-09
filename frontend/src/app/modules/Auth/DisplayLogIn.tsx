import useLoader from '@/app/GlobalComponents/CustomHooks/useLoader';
import React from 'react'
import LogInForm from './Components/LogInForm';

const DisplayLogIn = () => {
    const {ToggleLoaderOn,ToggleLoaderOff} = useLoader();
      

    const handleLoginSubmit=async(username:string, password:string)=>{
      ToggleLoaderOn("Comprobando Inicio de Sesion...");
      //simulacion logica del enpoint
      const realUser={username:"real",password:"real"};
      await new Promise((res)=>{setTimeout(res,3000)})
      if (username==realUser.username && password==realUser.password){
        //login
      };
      //console.log("no logueo");
      ToggleLoaderOff();
    }

  return (
    <React.Fragment>
        <LogInForm onSubmit={handleLoginSubmit} />
    </React.Fragment>
        
    
  )
}

export default DisplayLogIn
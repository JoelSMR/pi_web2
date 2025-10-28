'use client'
import React, { useState } from 'react'
import LogInFormModal from '../../Auth/Components/LogInFormModal';
import {useRouter}  from 'next/navigation';
import { AuthService } from '@/app/utils/api/Auth/Service/AuthService';
import useLoader from '@/app/GlobalComponents/CustomHooks/useLoader';
import { UserDB } from '../../Auth/Models/LogInFormModels';


const Header = () => {
    const [isLoginFormOpen,setIsLoginFormOpen] = useState<boolean>(false);

    const showLoginFormModal =()=> setIsLoginFormOpen(true);

    const hideLoginFormModal =()=> setIsLoginFormOpen(false);

    const {ToggleLoaderOn,ToggleLoaderOff} = useLoader();

    const router = useRouter();    

    const handleLoginSubmit=async(username:string, password:string)=>{
      try{
      ToggleLoaderOn("Comprobando Inicio de Sesion...");
      const response= await AuthService.LogInUser(username,password);
      const isRegistered= response.authenticated;
      if (isRegistered){ router.push("/modules/Dashboard/Renders/Products");}
    }finally{
      ToggleLoaderOff();
    }
    }

    const handleCreateUser=async(userData:UserDB)=>{
      await AuthService.createUser(userData);
    }

  return (
    <React.Fragment>
        <LogInFormModal 
            isOpen={isLoginFormOpen}
            onClose={hideLoginFormModal}
            onCreateUser={handleCreateUser}
            onSubmit={handleLoginSubmit}
        />

        <header className="w-full bg-indigo-600 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sysmarket</h1>
            <button
            onClick={showLoginFormModal}
            className="bg-white text-indigo-600 px-4 py-2 rounded-md font-semibold hover:bg-indigo-100"
            >
          Iniciar sesión
            </button>
        </header>
      </React.Fragment>
  )
}

export default Header
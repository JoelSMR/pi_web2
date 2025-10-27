'use client'

import React, { useState } from 'react'
import CreateUserModal from './CreateUserModal';
import { UserDB } from '../Models/LogInFormModels';

interface LoginFormProps{
  //Submit Login Function
  onSubmit:(user:string,pswd:string)=>Promise<void>|void;
  onCreateUser :(userData:UserDB) => Promise<void>
}
const LogInForm:React.FC<LoginFormProps> = ({ onSubmit , onCreateUser }) => {
  const [username,setUsername] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState<boolean>(false);


  return (
    <React.Fragment>
      <CreateUserModal isOpen={isCreateUserModalOpen}
        onShow = {()=>setIsCreateUserModalOpen(true)}
        onClose={()=>setIsCreateUserModalOpen(false)} 
        onConfirm={onCreateUser}
      />

      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">  
      <h2 className="mb-6 text-center text-2xl font-semibold text-slate-900 dark:text-slate-100">  
        Iniciar sesión  
      </h2>  
  
      <div className="mb-4">  
        <label  
          htmlFor="username"  
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"  
        >  
          Username  
        </label>  
        <input  
          id="username"  
          type="text"  
          autoComplete="username"  
          value={username}  
          onChange={(e) => setUsername(e.target.value)}  
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"  
          placeholder="tu_usuario"  
        />  
      </div>  
  
      <div className="mb-6">  
        <label  
          htmlFor="password"  
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"  
        >  
          Contraseña  
        </label>  
        <input  
          id="password"  
          type={isPasswordHidden?'password':'text'}  
          autoComplete="current-password"  
          value={password}  
          onChange={(e) => setPassword(e.target.value)}  
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"  
          placeholder="********"  
        />  
      </div>

      <button
      className='dark:text-white mb-4'
      onClick={()=>setIsCreateUserModalOpen(true)}
      >
      ¿No tienes Usuario?
      </button>  

      <button
      className='dark:text-white mb-4'
      onClick={()=>setIsPasswordHidden(!isPasswordHidden)}>
        { isPasswordHidden? 'Mostrar Contraseña' : 'Ocultar Contraseña'}
      </button>
      <button  
        type="button"  
        onClick={()=>{onSubmit(username,password)}}  
        className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:ring-offset-slate-800"  
      >  
        Entrar  
      </button>
      </div>
    </React.Fragment>
  )
}

export default LogInForm;



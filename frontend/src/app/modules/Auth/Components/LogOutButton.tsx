import React from 'react'
import {useRouter} from 'next/navigation'
const LogOutButton = () => {
  
  const router = useRouter();
  const handleLogOut=()=>{
    router.push("/")
  }

  return (
    <React.Fragment>
        <button 
          onClick={handleLogOut}
          className='flex bg-red-500 items-center gap-2 rounded-md px-3 py-2 text-sm transition text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'>
          Cerrar Sesion
        </button>
    </React.Fragment>
  )
}

export default LogOutButton
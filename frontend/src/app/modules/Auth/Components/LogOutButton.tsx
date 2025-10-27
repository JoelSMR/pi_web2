import React from 'react'
import Router from 'next/router'
const LogOutButton = () => {
  
  const router = Router;
  const handleLogOut=()=>{
    router.push("/modules/Auth")
  }

  return (
    <React.Fragment>
        <button 
          onClick={handleLogOut}
          className='bg-red-700 text.white hover:bg-red-600'>
          Cerrar Sesion
        </button>
    </React.Fragment>
  )
}

export default LogOutButton
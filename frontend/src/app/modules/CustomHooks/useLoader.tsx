'use client'
import React,{useCallback, useState} from 'react'
import Loader from '../Components/Loader'

const useLoader = () => {
    const [isLoading,setIsLoading] = useState<boolean>(false);
     
    const ToggleLoaderOn= useCallback(()=> {
        setIsLoading(true);
        console.log("cargando")
    },[]);

    const ToggleLoaderOff= useCallback(()=>{
        console.log("dejando de cargar")
        setIsLoading(false);
    },[]);

    const RenderLoader =()=>{
        console.log("renderizando carga")
        return isLoading? (<Loader />) :null
    };

    return {ToggleLoaderOn, ToggleLoaderOff, RenderLoader}

}

export default useLoader
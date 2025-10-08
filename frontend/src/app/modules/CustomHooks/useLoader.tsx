'use client'
import React,{useCallback, useState} from 'react'
import Loader from '../Components/Loader'

const useLoader = () => {
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");

    const ToggleLoaderOn= ()=> {
        setIsLoading(true);
    }

    const ToggleLoaderOff= useCallback((msg='MensajePersonalizadoApagado')=>{
        setMsg(msg);
        setIsLoading(false);
    },[]);

    const RenderLoader =()=>{
        return isLoading? (<Loader/>) :null
    };

    return {ToggleLoaderOn, ToggleLoaderOff, RenderLoader}

}

export default useLoader
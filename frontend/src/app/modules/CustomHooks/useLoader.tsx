import React,{useCallback, useState} from 'react'
import Loader from '../Components/Loader'

const useLoader = () => {
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");

    const ToogleLoaderOn= useCallback((msg='MensajePersonalizadoEncendido')=>{
        setMsg(msg)
        setIsLoading(true)
    },[])

    const ToogleLoaderOff= useCallback((msg='MensajePersonalizadoApagado')=>{
        setMsg(msg)
        setIsLoading(false)
    },[])

    const RenderLoader =()=>{
        return isLoading? (<Loader/>) :null
    }

    return {ToogleLoaderOn, ToogleLoaderOff, RenderLoader}

}

export default useLoader
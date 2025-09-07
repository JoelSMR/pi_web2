'use client'

import React,{useState,useCallback} from 'react'
import Loader from './Loader';
import { HasLoadingBoundary } from 'next/dist/server/app-render/types';

const useLoader = () => {
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState("");

    const showLoader =  useCallback((msg='Cargando...')=>{
        setMessage(msg);
        setLoading(true);
    
    },[]);

    const hideLoader = useCallback(() => {
    setLoading(false);
    setMessage('');
  }, []);
    const RenderLoader=()=>{
        return loading?(<Loader/>):null
    } 
    
  return {RenderLoader,showLoader,hideLoader,loading}
  
}

export default useLoader

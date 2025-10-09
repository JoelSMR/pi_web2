'use client'

import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import { LoaderContextValue } from './LoaderContextModels'
import Loader from '../Renders/Loader'


const LoaderContext = createContext<LoaderContextValue | undefined>(undefined)  
  
export function LoaderProvider({ children }: { children: ReactNode }) {  
  const [isLoading, setIsLoading] = useState<boolean>(false)  
  
  const ToggleLoaderOn = useCallback(() => {  
    setIsLoading(true)  
    console.log('cargando')  
  }, [])  
  
  const ToggleLoaderOff = useCallback(() => {  
    setIsLoading(false)  
    console.log('dejando de cargar')  
  }, [])  
  
  const value = useMemo<LoaderContextValue>(  
    () => ({  
      isLoading,  
      ToggleLoaderOn,  
      ToggleLoaderOff,  
      setIsLoading: setIsLoading,  
    }),  
    [isLoading, ToggleLoaderOn, ToggleLoaderOff]  
  )  
  
  return (  
    <LoaderContext.Provider value={value}>  
      {/* Render global del loader para que aparezca en toda la app */}  
      {isLoading ? <Loader /> : null}  
      {children}  
    </LoaderContext.Provider>  
  )  
}  
  
// Hook para consumir el contexto en cualquier componente  
export function useLoaderContext(): LoaderContextValue {  
  const ctx = useContext(LoaderContext)  
  if (!ctx) {  
    throw new Error('useLoaderContext debe usarse dentro de <LoaderProvider>')  
  }  
  return ctx  
}
 

export default LoaderContext
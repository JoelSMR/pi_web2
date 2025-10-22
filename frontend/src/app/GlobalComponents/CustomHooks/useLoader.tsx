'use client'
import { useLoaderContext } from "../CustomProviders/LoaderProvider"

/**
 * @Implementation  const { ToggleLoaderOn, ToggleLoaderOff, RenderLoader } = useLoader()
 * @ToogleLoaderOn  Turns true the inner state of the LoaderContext / Renders when true
 * @ToogleLoaderOff Turns false the inner state of the LoaderContext / Renders when true
 * @RenderLoader  Outdated
 * 
 * @Info
 * This custom hook works wrapping the context functionabilities
 * 
 * The useLoader CustomHook inherits the useLoaderContext inner funcs, this means that the func container is the context
 * 
 * This way let us keep the compatibility and makes easy to understand the func
 * @returns 
 * Two functions that changes the context value of 'isLoading' and the RenderComponent
 * 
 */
const useLoader = () => {
  const { isLoading, ToggleLoaderOn, ToggleLoaderOff } = useLoaderContext();

  const RenderLoader = () => {
    return isLoading ? null : null
    // Nota: como el Provider ya pinta <Loader />, aquí normalmente no necesitas volver a renderizarlo.
    // Lo dejamos como no-op para mantener compatibilidad.
  }

  return { ToggleLoaderOn, ToggleLoaderOff, RenderLoader }
}

export default useLoader
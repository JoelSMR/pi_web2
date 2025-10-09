'use client'
import { useLoaderContext } from "../CustomProviders/LoaderProvider"

const useLoader = () => {
  const { isLoading, ToggleLoaderOn, ToggleLoaderOff } = useLoaderContext();

  const RenderLoader = () => {
    return isLoading ? null : null
    // Nota: como el Provider ya pinta <Loader />, aquí normalmente no necesitas volver a renderizarlo.
    // Lo dejamos como no-op para mantener compatibilidad. Si prefieres, elimina RenderLoader.
  }

  return { ToggleLoaderOn, ToggleLoaderOff, RenderLoader, isLoading }
}

export default useLoader
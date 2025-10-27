/**
 * @param idProveedor  number
 * @param nombre  string
 * @param telefono string
 * @param email  string

 */
export interface Provider{
idProveedor: number,
nombre:string,
telefono:string,
email:string,
};
/**
 * @param nombre  string
 * @param telefono string
 * @param email  string
 */
export interface NewProviderToCreate{
    nombre: string,
    telefono: string,
    email: string
};

/**
 * 
 */
export interface EditableProvider{
    nombre: string,
    telefono: string,
    email: string
}
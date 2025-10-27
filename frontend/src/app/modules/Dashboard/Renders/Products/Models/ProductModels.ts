import { Provider } from "@/app/modules/Dashboard/Renders/Providers/Models/ProviderModels"

/**
 * @param productId  number
 * @param price  number
 * @param name  string
 * @param description  string
 * @param category  string
 
 */
export interface Product{
productId:number,
price:number,
name:string,
description:string,
category:string,
proveedor : Provider
};
export interface NewProductToCreate{
    price: number,
    name: string,
    description: string,
    category: string,
    proveedor: Provider
};
export interface EditableProduct{
    name:string
    price:number
    description:string
    category:string
    providerId: number
}
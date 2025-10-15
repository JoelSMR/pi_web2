import { Product } from "@/app/modules/Dashboard/Renders/Products/Models/ProductModels";

export interface EditableProduct{
    name:string
    price:number
    description:string
    category:string
}
export const ProductToEditProduct=async(oldProduct:Product)=>{
    const productMapped:EditableProduct ={name: oldProduct.name, price: oldProduct.price,
                                          description: oldProduct.description, category: oldProduct.category }
    return productMapped    
}
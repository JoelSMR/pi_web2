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


export const ResponseToProduct=async(responseData:Product[])=>{
    try{
        if (Array.isArray(responseData)) {  
      // Sanitiza cada item por si faltan campos  
      return responseData.map((d) => ({  
        id: Number(d.id ?? 0),  
        price: Number(d.price ?? 0),  
        name: String(d.name ?? ''),  
        description: String(d.description ?? ''),  
        category: String(d.category ?? ''),  
      }));  
    }

    }catch(error){

    }

}
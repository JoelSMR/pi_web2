import { EditableProduct, NewProductToCreate, Product } from "@/app/modules/Dashboard/Renders/Products/Models/ProductModels";
import { ProviderService } from "../../Provider/Service/ProviderService";


export const ProductToEditProduct=async(oldProduct:Product)=>{
    const productMapped:EditableProduct ={name: oldProduct.name, price: oldProduct.price,
                                          description: oldProduct.description, category: oldProduct.category,
                                          providerId: oldProduct.proveedor.idProveedor}
    return productMapped    
}
export const EditProductToProduct=async(oldProduct:EditableProduct)=>{
    const productMapped:Product ={productId:oldProduct.providerId,
                                  name: oldProduct.name, price: oldProduct.price,
                                  description: oldProduct.description, category: oldProduct.category,
                                  proveedor: await ProviderService.getProviderById(oldProduct.providerId)
                                    }
    return productMapped    
}

export const CreateProductToProduct= async (createdProduct:NewProductToCreate)=>{
  const productMapped:Product={
    productId:100,
    price:createdProduct.price,
    name:createdProduct.name,
    description:createdProduct.description,
    category:createdProduct.category,
    proveedor: await ProviderService.getProviderById(createdProduct.proveedor.idProveedor)
  }
  return productMapped
}

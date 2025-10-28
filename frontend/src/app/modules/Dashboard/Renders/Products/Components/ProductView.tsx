'use client'
import React, { useEffect, useState } from 'react'
import CardInfo from './ProductCardInfo'
import { NewProductToCreate, Product } from '../Models/ProductModels'
import ProductService from '@/app/utils/api/Product/Service/ProductService'
import useLoader from '@/app/GlobalComponents/CustomHooks/useLoader'
import RefreshButton from '@/app/modules/Dashboard/Components/RefreshButton'
import ConfirmationModal from '@/app/GlobalComponents/Renders/ConfirmationModal'
import EditProductModal from './EditProductModal'
import CreateObjectButton from '../../../Components/CreateObjectButton'
import { ProviderService } from '@/app/utils/api/Provider/Service/ProviderService'
import { Provider } from '../../Providers/Models/ProviderModels'
import { mapProvidersToDropDownItems } from '@/app/utils/api/Provider/Mappers/ProviderMappers'
import { DropdownItem } from '@/app/GlobalComponents/Renders/Dropdown'

type ProductsListViewProps = {
  title?: string
  emptyMessage?: string
}
/**
 * @Info
 * Return the JSX render that contains all the ProductDashBoardList Stuff. Allowing users to CRUD Function the data
 * 
 * @returns  JSX Render
 */
const ProductsListView: React.FC<ProductsListViewProps> = ({
  title = 'Productos',
  emptyMessage = 'No hay elementos para mostrar.'
}) => {
    //Controls the render of the delete modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    //Controls the render of the edit modal
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    //Controls the selected id. This refers to an Object ID
    const [selectedId, setSelectedId] = useState<number>(0);
    //Controls the selected id. This refers to an Object ID
    const [selectedItem,setSelectedItem]= useState<Product>({
      productId:0,price:0,category:"",description:"",name:"",proveedor:{
        idProveedor:0,email:"",nombre:"",telefono:""
        }
      }
    );
    //Renders the Loader Provided By Context
    const {ToggleLoaderOn, ToggleLoaderOff} = useLoader();
    //Items Fetched by FetchItems
    const [items,setItems]=useState<Product[]>([
      {
        productId:0,price:0,category:"",description:"",name:"",
        proveedor:{
          idProveedor:0,email:"",nombre:"",telefono:""
        }
      }
    ]);

    const [dropdownItems,setDropdownItems] = useState<DropdownItem[]>([{id:0,name:''}])

    const fetchItems=async ()=>{
        ToggleLoaderOn("Consultando Productos ...");
        try{
        const iArray=await ProductService.getAllProducts();
        setItems(iArray);
        }
        catch(error){
          console.log(error);
        }
        finally{
          ToggleLoaderOff();
        }
    };

   
    useEffect(()=>{
      const fetchProviders=async()=>{
        ToggleLoaderOn("Consultado Proveedores ... ")
        try{
          const pArray:Provider[] = await ProviderService.getAllProviders();
          setDropdownItems(mapProvidersToDropDownItems(pArray));
        }catch(e){console.log(e as Error || "Error en FetchProviders")}
        finally{
          ToggleLoaderOff();
        }
      };

      fetchItems();
      fetchProviders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleCreate=async(np:NewProductToCreate)=>{
      try{
      await ProductService.createProduct(np);
      }
      finally{
      fetchItems();
      }
    }

    /**
     * 
     * @param id 
     * @Info  Enables the state that controls the next stage of the delet process. Also set the selectedIdState the selectedIdItem
     */
    const showDeleteModal=async(id:number)=>{
      setSelectedId(id);
      setIsDeleteModalOpen(true)
    }

    /**
     * 
     * @param id 
     * @Info  
     */
    const handleDeleteProduct=async(id:number)=>{
      try{
      setIsDeleteModalOpen(false);
      ToggleLoaderOn("Eliminando Producto");
      await ProductService.deleteProductById(id);
      }
      finally{
      setSelectedId(0);
      ToggleLoaderOff();
      fetchItems();
      }
    }
    
    const showEditModal=async(id:number,nProducto:Product)=>{
      setSelectedId(id);
      setSelectedItem(nProducto);
      setIsEditModalOpen(true);

    }

    const handleEditProduct =async(id:number,nProduct:Product)=>{
      try{
        setIsEditModalOpen(false);
        ToggleLoaderOn("Editando Producto ...");
        await ProductService.updateProductByid(id,nProduct);
      }
      finally{
        ToggleLoaderOff();
        fetchItems();
      }

    }

  return (
    <section className={'space-y-4'}>
      {/* Header con botón a la derecha */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-700">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <CreateObjectButton instanceOf='product' dropdownItems={dropdownItems} onCreateProduct={handleCreate} />
          <RefreshButton label='' onRefresh={fetchItems}/>
        </div>
      </div>

      {/* Lista de tarjetas */}
      { (items.length === 0 || !Array.isArray(items)) ? (
        <div className="rounded-lg border border-slate-200 p-8 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
          {emptyMessage}
        </div>
      ) : (
        <React.Fragment >
          {/* Confirmar Eliminacion */}
          <ConfirmationModal isOpen={isDeleteModalOpen} onAccept={()=>{handleDeleteProduct(selectedId)}} onClose={()=>{setIsDeleteModalOpen(false)}} />
          {/* Muestra vista de edicion */}
          <EditProductModal isEditModalOpen={isEditModalOpen} onClose={()=>setIsEditModalOpen(false)} onConfirmFunction={handleEditProduct} elementId={selectedId} providersArray={dropdownItems}/>
          
          {items.map((p:Product) => (
            <>
            {console.log(p)}
            <CardInfo
              key={p.productId}
              productId={p.productId}
              name={p.name}
              description={p.description}
              category={p.category}
              price={p.price}
              proveedor={p.proveedor}
              onEdit={showEditModal}
              onDelete={()=>showDeleteModal(p.productId)}
              selectedItem={selectedItem}

            />
            </>
          ))}
        </React.Fragment>
      )}
    </section>
  )
}

export default ProductsListView
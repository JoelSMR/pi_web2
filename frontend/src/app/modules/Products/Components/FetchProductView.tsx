'use client'

import React, { useEffect, useState } from 'react'
import ProductService from '@/app/api/ProductService'
import useLoader from '@/app/GlobalComponents/CustomHooks/useLoader'
import { Product } from '../Models/ProductModels'
import CardInfo from './ProductCardInfo'
import ConfirmationModal from '@/app/GlobalComponents/Renders/ConfirmationModal'
import EditProductModal from './EditProductModal'



const FetchProductView = () => {
    const {ToggleLoaderOn ,ToggleLoaderOff} = useLoader();
    const [products, setProducts] = useState<Product[]>([]);
    const [isDeleteConfirmationModalOpen,setIsDeleteConfirmationModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(0);


    useEffect(()=>{
      handleFetchAllUsersHook()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleDeleteProduct=(id:number)=>{
      setIsDeleteConfirmationModalOpen(true);
      setSelectedId(id);
    }
    const hideDeleteConfirmationModal=()=>{
      setIsDeleteConfirmationModalOpen(false);
    }

    const handleConfirmDeleteProduct = async()=>{
      ToggleLoaderOn("Eliminando Producto...");
      hideDeleteConfirmationModal();
      //const response = await ProductService.deleteProductById(1);
      ToggleLoaderOff();
    }

    //Cierra el Modal Formualrio de Edicion
    const hideEditModal=()=>{
      setIsEditModalOpen(false);
    }
    //Abre el modal Formulario de edicion y establece IdSeleccioando
    const handleEditProduct=(id:number)=>{
      setIsEditModalOpen(true);
      setSelectedId(id);
    }
    
    //Aplica la logica final al confirmar la edicion
    const handleConfirmEditProduct=async()=>{
      try{
      ToggleLoaderOn("Editando Producto...");


      }catch(error){console.log(error) ;}
      finally{
      ToggleLoaderOff();
      }
    }
    
    const handleFetchAllUsersHook=async()=>{
        try{ToggleLoaderOn("Buscando Productos ...");
        const data = await ProductService.getAllProducts()
        setProducts(Array.isArray(data)? data:[{"id":1,"category":"categoria","description":"descripcion","name":"nombre","price":12.0}]);
        }catch(error){console.log(error);}
        finally{ToggleLoaderOff();}
    }

  return (
    <React.Fragment>
    <ConfirmationModal 
       isOpen={isDeleteConfirmationModalOpen}  onAccept={handleConfirmDeleteProduct}
      onClose={()=>setIsDeleteConfirmationModalOpen(false)} 
    />

    <EditProductModal 
      isEditModalOpen={isEditModalOpen} onClose={hideEditModal}
      onConfirmFunction={handleConfirmEditProduct} elementId={selectedId} 
    />


    {products.map((item)=>(
      <React.Fragment key={item.id}>
        <CardInfo id={item.id} category={item.category} 
          description={item.description} name={item.name} price={item.price}
          onDelete={()=>handleDeleteProduct(item.id)} onEdit={()=>handleEditProduct(item.id)}
        />
      </React.Fragment>
        
        
    ))}

    </React.Fragment>
  )
}

export default FetchProductView
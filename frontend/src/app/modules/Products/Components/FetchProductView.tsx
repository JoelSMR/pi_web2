'use client'

import React, { useEffect, useState } from 'react'
import ProductService from '@/app/api/ProductService'
import useLoader from '../CustomHooks/useLoader'
import { Product } from '../../modules/Products/Models/ProductModels'
import CardInfo from '../../modules/Products/Components/ProductCardInfo'
import ConfirmationModal from '@/app/GlobalComponents/Renders/ConfirmationModal'



const FetchProductView = () => {
    const {ToggleLoaderOn ,ToggleLoaderOff} = useLoader();
    const [products, setProducts] = useState<Product[]>([]);
    const [isDeleteConfirmationModalOpen,setIsDeleteConfirmationModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);


    useEffect(()=>{
      handleFetchAllUsersHook()
    },[])

    const showEditModal=()=>{
      setIsEditModalOpen(true);
    }
    const hideEditModal=()=>{
      setIsEditModalOpen(false);
    }

    const showDeleteConfirmationModal=()=>{
      setIsDeleteConfirmationModalOpen(true);
    }
    const hideDeleteConfirmationModal=()=>{
      setIsDeleteConfirmationModalOpen(false);
    }

    const handleDeleteProduct = async()=>{
     ToggleLoaderOn("Eliminando Producto...");
     hideDeleteConfirmationModal();
      //      Real Funct
      //const response = await ProductService.deleteProductById(1);
      //console.log(response)
      await new Promise((res)=>setTimeout(res,3000))
      setProducts([])
      ToggleLoaderOff();
    }

    
    const handleEditProduct=async()=>{
      try{
      ToggleLoaderOn("Editando Producto...");
      //const oldProduct:Product = await ProductService.getProductById(old_p_id);
      await new Promise((res)=>setTimeout(res,300));
      setProducts([{"id":1,"category":"Ecategoria","description":"Edescripcion","name":"Enombre","price":112.0}]);
      }catch(error){console.log(error)}
      finally{
      ToggleLoaderOff();
      }
    }
    
    const handleFetchAllUsersHook=async()=>{
        try{ToggleLoaderOn("Buscando Productos ...");
        const data = await ProductService.getAllProducts()
        setProducts(Array.isArray(data)? data:[{"id":1,"category":"categoria","description":"descripcion","name":"nombre","price":12.0}]);
        }catch(error){console.log(error); setProducts([{"id":1,"category":"categoria","description":"descripcion","name":"nombre","price":12.0}])}
        finally{ToggleLoaderOff();}
    }


    const handleFetchAllUsers=async(EVENT: React.FormEvent<HTMLFormElement>)=>{
        EVENT.preventDefault()
        try{ToggleLoaderOn("Buscando ...");
        const data = await ProductService.getAllProducts()
        setProducts(Array.isArray(data)? data:[{"id":1,"category":"categoria","description":"descripcion","name":"nombre","price":12.0}]);
        }catch(error){console.log(error); setProducts([{"id":1,"category":"categoria","description":"descripcion","name":"nombre","price":12.0}])}
        finally{ToggleLoaderOff();}
    }

  return (
    <React.Fragment>
    <ConfirmationModal onAccept={handleDeleteProduct} isOpen={isDeleteConfirmationModalOpen} onClose={()=>setIsDeleteConfirmationModalOpen(false)} />
    
    {products.map((item)=>(
      <React.Fragment key={item.id}>
        <CardInfo id={item.id} category={item.category} description={item.description} name={item.name} price={item.price}
          onDelete={showDeleteConfirmationModal} onEdit={showEditModal}
        />
      </React.Fragment>
        
        
    ))}

    <form action=""
    onSubmit={handleFetchAllUsers}>
            <button type="submit">Fetch All Users</button>
    </form>

    
    </React.Fragment>
  )
}

export default FetchProductView
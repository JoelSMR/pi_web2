'use client'

import React, { useEffect, useState } from 'react'
import ProductService from '@/app/api/ProductService'
import useLoader from '../../CustomHooks/useLoader'
import { Product } from '../Models/ProductModels'
import CardInfo from './ProductCardInfo'

const FetchProductView = () => {
    const {ToggleLoaderOn ,ToggleLoaderOff,RenderLoader} = useLoader();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(()=>{
      handleFetchAllUsersHook()
    },[])

    const handleDeleteProduct = async()=>{
      ToggleLoaderOn();
      //      Real Funct
      //const response = await ProductService.deleteProductById(1);
      //console.log(response)
      await new Promise((res)=>setTimeout(res,300))
      setProducts([])
      ToggleLoaderOff();
    }

    const handleEditProduct=async()=>{
      try{
      ToggleLoaderOn();
      //const oldProduct:Product = await ProductService.getProductById(old_p_id);
      await new Promise((res)=>setTimeout(res,300));
      setProducts([{"id":1,"category":"Ecategoria","description":"Edescripcion","name":"Enombre","price":112.0}]);
      }catch(error){console.log(error)}
      finally{
      ToggleLoaderOff();
      }
    }
    
    const handleFetchAllUsersHook=async()=>{
        try{ToggleLoaderOn();
        const data = await ProductService.getAllProducts()
        setProducts(Array.isArray(data)? data:[{"id":1,"category":"categoria","description":"descripcion","name":"nombre","price":12.0}]);
        }catch(error){console.log(error); setProducts([{"id":1,"category":"categoria","description":"descripcion","name":"nombre","price":12.0}])}
        finally{ToggleLoaderOff();}
    }


    const handleFetchAllUsers=async(EVENT: React.FormEvent<HTMLFormElement>)=>{
        EVENT.preventDefault()
        try{ToggleLoaderOn();
        const data = await ProductService.getAllProducts()
        setProducts(Array.isArray(data)? data:[{"id":1,"category":"categoria","description":"descripcion","name":"nombre","price":12.0}]);
        }catch(error){console.log(error); setProducts([{"id":1,"category":"categoria","description":"descripcion","name":"nombre","price":12.0}])}
        finally{ToggleLoaderOff();}
    }

  return (
    <React.Fragment>
    {/* Always render Loader if the inner condition throws True */}
    <RenderLoader />

    
    {products.map((item)=>(
      <React.Fragment key={item.id}>
        <CardInfo id={item.id} category={item.category} description={item.description} name={item.name} price={item.price}
          onDelete={handleDeleteProduct} onEdit={handleEditProduct}
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
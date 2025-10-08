'use client'

import React, { useState } from 'react'
import ProductService from '@/app/api/ProductService'
import useLoader from '../../CustomHooks/useLoader'
import { Product } from '../Models/ProductModels'
import CardInfo from '../../Components/CardInfo'

const FetchProductView = () => {
    const {ToggleLoaderOn ,ToggleLoaderOff,RenderLoader} = useLoader();
    const [products, setProducts] = useState<Product[]>([]);

    const handleFetchAllUsers=async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
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
        <CardInfo id={item.id} category={item.category} description={item.description} name={item.name} price={item.price}/>
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
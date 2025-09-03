'use client'
import React from 'react'
import useLoader from '@/app/Components/UI/Loader/useLoader'
const ProductCheckout = () => {
  const {RenderLoader,showLoader,hideLoader,loading} = useLoader()
  const handleSubmmit=()=>{
    showLoader()
    setTimeout(()=>hideLoader(),3000)
  }
  return (
    <>
    <button onClick={handleSubmmit}>Carga</button>
      {loading&& <RenderLoader/>}
    </>
  )
}

export default ProductCheckout

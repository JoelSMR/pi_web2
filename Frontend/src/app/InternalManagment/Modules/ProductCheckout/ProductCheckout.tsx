'use client'
import React from 'react'
import useLoader from '@/Global/GlobalComponents/UI/Loader/useLoader'
import BarcodeReader from './Utils/BarcodeReader'

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

      <BarcodeReader/>
    </>
  )
}

export default ProductCheckout

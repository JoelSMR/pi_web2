'use client'

import React, { useState } from 'react'
import ProductCheckout from '../ProductCheckout/ProductCheckout'
import AdminBoard from '../AdminBoard/page'
import Sidebar from './Sidebar'

const Dashboard: React.FC = () => {
  const [selected,setSelected]= useState<string>('')
  
  const renderContent=()=>{
    switch(selected){
      case 'ProductCheckout':
        return <ProductCheckout/>;
      case "AdminModule":
        return <AdminBoard/>
    }
  }
  return (
    <div className="flex h-screen">
      <Sidebar onSelect={setSelected} />
      <div className="flex-1 bg-gray-100 overflow-auto">
        {renderContent()}
      </div>
    </div>
  )
}

export default Dashboard

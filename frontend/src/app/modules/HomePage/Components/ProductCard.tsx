import React from 'react'

interface ProductCardProps{
    productName: string
    productPrice: number
    productProvider: string
}
const ProductCard:React.FC<ProductCardProps> = ({productName , productPrice, productProvider}) => {
  return (
    <React.Fragment>
        <div className="bg-white shadow-md rounded-lg p-4 text-center hover:scale-105 transition">
            <h3 className="font-semibold mt-2">{productName}</h3>
            <p className="text-indigo-600 font-bold">$ {productPrice}</p>
            <p className="text-indigo-600 font-bold">De: {productProvider}</p>
          </div>
    </React.Fragment>
  )
}

export default ProductCard
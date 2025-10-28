'use client'
import ProductService from "@/app/utils/api/Product/Service/ProductService";
import Header from "../Components/Header";
import ProductCard from "../Components/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "../../Dashboard/Renders/Products/Models/ProductModels";
import Footer from "../Components/Footer";

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([{
        productId: 0,
        price: 0,
        name: "",
        description: "",
        category: "",
        proveedor:{
            idProveedor: 0,
            nombre: "",
            telefono: "",
            email: ""
        }
    }]);
    
    useEffect(()=>{
        const fetchProducts =async()=>{
            setProducts(await ProductService.getAllProducts());
        }
        fetchProducts();
    },[])

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header */}
      <Header />

      {/* Presentación */}
      <section className="text-center max-w-2xl mt-12 bg-red-600">
        <h2 className="text-3xl font-bold mb-4">Tu sistema de gestión de inventario</h2>
        <p className="text-gray-600 mb-6">
          Sysmarket te ayuda a administrar productos, precios y existencias de forma sencilla
          y eficiente. Perfecto para pequeños negocios o emprendimientos.
        </p>
      </section>

      {/* Productos */}
      <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-8 w-full max-w-6xl">
        {products.map((p) => (
          <ProductCard key={p.productId}
            productName={p.name}
            productPrice={p.price}
            productProvider={p.proveedor.nombre}
          />
        ))}
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

'use client';
import { useEffect, useState } from 'react';

interface Product {
  productId: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener productos:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando productos...</p>;

  return (
    <section className="p-8 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Productos Disponibles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.productId}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{p.description}</p>
            <p className="text-blue-600 font-bold">${p.price}</p>
            <p className="text-xs text-gray-500 mt-1">Categoría: {p.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

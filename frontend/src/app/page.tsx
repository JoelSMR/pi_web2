'use client';
import Image from 'next/image';
import Link from 'next/link';
import ProductsList from './GlobalComponents/Renders/ProductsList';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-indigo-600 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sysmarket</h1>
        <Link
          href="/modules/Auth"
          className="bg-white text-indigo-600 px-4 py-2 rounded-md font-semibold hover:bg-indigo-100"
        >
          Iniciar sesión
        </Link>
      </header>

      {/* Presentación */}
      <section className="text-center max-w-2xl mt-12">
        <h2 className="text-3xl font-bold mb-4">Tu sistema de gestión de inventario</h2>
        <p className="text-gray-600 mb-6">
          Sysmarket te ayuda a administrar productos, precios y existencias de forma sencilla
          y eficiente. Perfecto para pequeños negocios o emprendimientos.
        </p>
        <Image
          src="pi_web2/frontend/src/app/Images/inventario.png"
          alt="Gestión de inventario"
          width={500}
          height={300}
          className="rounded-lg shadow-md mx-auto"
        />
      </section>

      {/* Productos desde la API */}
      <ProductsList />

      {/* Footer */}
      <footer className="mt-16 py-4 text-gray-500">
        © 2025 Sysmarket. Todos los derechos reservados.
      </footer>
    </main>
  );
}

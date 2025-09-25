"use client";
  
import React from 'react'



import { useState } from "react";

export default function FormularioFetch() {
  const [valor, setValor] = useState("");

  // Función que hace un fetch al presionar el botón
  const hacerFetch = async () => {
    try {
      // Ejemplo con una API pública que devuelve un JSON
      const res = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await res.json();

      // Tomamos un campo de la respuesta y lo ponemos en el input
      setValor(data.value);
    } catch (error) {
      console.error("Error en el fetch:", error);
      setValor("Error al obtener datos");
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert(`Valor enviado: ${valor}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md space-y-4 w-96"
      >
        <h2 className="text-xl font-bold text-center">Formulario con Fetch</h2>

        {/* Input que recibe el resultado del fetch */}
        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="border rounded p-2 w-full"
          placeholder="Aquí aparecerá el resultado"
        />

        {/* Botón que hace fetch y rellena el input */}
        <button
          type="button"
          onClick={hacerFetch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Obtener valor de la API
        </button>

        {/* Botón de submit */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}


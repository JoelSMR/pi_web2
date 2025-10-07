// src/api/axiosInstance.ts
import axios from "axios";

export const axiosProductInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCT_API_URL, // <-- Esto sí funciona en tiempo de build
});
export const axiosProviderInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PROVIDER_API_URL, // <-- Esto sí funciona en tiempo de build
});

console.log("BASE URL:", process.env.NEXT_PUBLIC_PROVIDER_API_URL);
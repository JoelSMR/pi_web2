import axios from "axios";

export const axiosProductCheckoutInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCT_API_URL, // <-- Esto sí funciona en tiempo de build
});

console.log("BASE URL:", process.env.NEXT_PUBLIC_PRODUCT_CHECKOUT_API_URL);
// src/api/axiosInstance.ts
import axios from "axios";

export const axiosProductInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCT_API_URL,
});
export const axiosProviderInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PROVIDER_API_URL,
});
export const axiosAuthInstance = axios.create({
  baseURL:process.env.NEXT_PUBLIC_AUTH_API_URL, 
});

console.log("BASE URL:", process.env.NEXT_PUBLIC_PROVIDER_API_URL);
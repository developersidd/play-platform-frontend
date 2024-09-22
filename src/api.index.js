import axios from "axios";

export const privateApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

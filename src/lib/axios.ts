import axios from "axios";

export const authApi = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const productsApi = axios.create({
  baseURL: "http://localhost:3000",
})
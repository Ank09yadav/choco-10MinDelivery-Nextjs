
import { api } from "./client"

export type Product = {
  id: number;
  image: string;
  name: string;
  price: number;
  updatedAt: string;
  description?: string;
};
export const getAllProducts = async (): Promise<Product[]> => {
    const response = await api.get<{products : Product[]}>("/products");
    // console.log("Response : " , response.data);
    return response.data.products?? []; 
}

export const createProduct = async () :  Promise<void> => {
    const response = await api.post("/products");
    console.log(response);
}
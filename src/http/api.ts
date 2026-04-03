
import DeliveryPersonTable from "@/app/admin/deliver-persons/deliveryPersonTable";
import { api } from "./client"


export type Product = {
  id: number;
  image: string;
  name: string;
  price: number;
  updatedAt: string;
  description?: string;
};

export type Warehouse = {
  id: number;
  name: string;
  pincode: number;
};


export type Inventory = {
  id: number;
  sku: string;
  warehouse?: string;
  product?: string;
  warehouseId?: number;
  productId?: number;
};

export type DeliveryPerson = {
  id: number;
  name: string;
  phone: string;
  warehouseId?: number;
  warehouse?: string;
  warehousePincode?: number;
}

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get<{ products: Product[] }>("/products");
  return response.data.products ?? [];
}
export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
}
export const createProduct = async (data: FormData) => {
  const response = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
}

export const updateProduct = async (id: number, data: FormData) => {
  const response = await api.put(`/products/${id}`, data, {
    headers: {
      "content-type": "multipart/form-data",
    }
  })
  return response.data;
}

// Warehouse API
export const getAllWarehouses = async (): Promise<Warehouse[]> => {
  const response = await api.get<{ warehouses: Warehouse[] }>("/warehouse");
  return response.data.warehouses ?? [];
}

export const createWarehouse = async (data: { name: string; pincode: number }) => {
  const response = await api.post("/warehouse", data);
  return response.data;
}

export const updateWarehouse = async (id: number, data: { name: string; pincode: number }) => {
  const response = await api.put(`/warehouse/${id}`, data);
  return response.data;
}

export const deleteWarehouse = async (id: number) => {
  const response = await api.delete(`/warehouse/${id}`);
  return response.data;
}

// Inventory API
export const getAllInventories = async (): Promise<Inventory[]> => {
  const response = await api.get<{ inventories: Inventory[] }>("/inventories");
  return response.data.inventories ?? [];
}

export const createInventory = async (data: { sku: string; warehouseId: number; productId: number }) => {
  const response = await api.post("/inventories", data);
  return response.data;
}

export const updateInventory = async (id: number, data: { sku: string; warehouseId: number; productId: number }) => {
  const response = await api.put(`/inventories/${id}`, data);
  return response.data;
}

export const deleteInventory = async (id: number) => {
  const response = await api.delete(`/inventories/${id}`);
  return response.data;
}

// Delivery Person API
export const getAllDeliveryPersons = async (): Promise<DeliveryPerson[]> => {
  const response = await api.get<{ deliveryPersons: DeliveryPerson[]}>("/delivery-persons");
  return response.data.deliveryPersons ?? [];
}

export const createDeliveryPerson = async (data: { name: string; phone: string; warehouseId: number }) => {
  const response = await api.post("/delivery-persons", data);
  return response.data;
}

export const updateDeliveryPerson = async (id: number, data :{ name : string , phone:string, warehouseId:number} ) => {
  const response = await api.put(`/delivery-persons/${id}`, data);
  return response.data;
}

export const deleteDeliveryPerson = async (id: number) => {
  const response = await api.delete(`/delivery-persons/${id}`);
  return response.data;
}
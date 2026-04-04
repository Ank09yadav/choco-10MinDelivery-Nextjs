import { z } from "zod";

const isServer = typeof window === "undefined";

export const orderSchema = z.object({
    productId: z.number().min(1, {message:"Product id should to be a Number"}),
    pincode: z.string().length(6, {message:"Pincode should to be a String"}),
    quantity: z.number().min(1, {message:"Quantity should to be a Number"}),
    address: z.string({message:"Address is required"}).min(1, {message:"Address should be 5 characters long"}),
    deliveryPersonId: z.number().min(1, {message:"Delivery person id should to be a Number"}),
    warehouseId: z.number().min(1, {message:"Warehouse id should to be a Number"}),
    userId: z.number().min(1, {message:"User id should to be a Number"}),
    status: z.string().min(1, {message:"Status should to be a String"}),
    createdAt: z.string().min(1, {message:"Created at should to be a String"}),
    updatedAt: z.string().min(1, {message:"Updated at should to be a String"}),
})
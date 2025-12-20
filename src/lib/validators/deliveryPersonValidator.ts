import { z } from "zod";
import { orders } from "../DB/schema";

export const deliveryPersonValidator = z.object({
    name: z.string({message: "Delivery person name is required"}).min(3, {message: "Delivery person name must be 3 characters long"}),
    phone: z.string({message: "Delivery person phone number is required"}).length(13, {message: "Delivery person phone number must be 13 digits long"}),
    warehouseId: z.number({message: "Warehouse ID is required"}),
   
})
import { z } from "zod";

export const warehouseValidator = z.object({
    name: z.string({message: "Warehouse name is required"}).min(1, {message: "Warehouse name cannot be empty"}),
    pincode: z.number({message: "Warehouse pincode is required"}).min(100000, {message: "Warehouse pincode must be at least 6 digits"}).max(999999, {message: "Warehouse pincode must be at most 6 digits"}),
})
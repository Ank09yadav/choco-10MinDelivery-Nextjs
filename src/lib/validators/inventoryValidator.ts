import { z } from "zod";

export const inventoryValidator = z.object({
    sku: z.string({message: "Product SKU is required"}).length(8, {message: "Product SKU must be 8 characters long"}),
    warehouseId: z.number({message: "Warehouse ID is required"}),
    productId: z.number({message: "Product ID is required"}),
})

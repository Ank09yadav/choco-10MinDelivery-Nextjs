import {z} from "zod";

export const inventorySchema = z.object({
    sku:z.string({message:"SKU must be between 3 and 8 characters"}).max(8),
    warehouseId:z.number({message:"Warehouse ID must be a number"}),
    productId:z.number({message:"Product ID must be a number"}),
}
);
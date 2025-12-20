import { z } from "zod";

export const productValidator = z.object({
    name: z.string({message: "Product name is required"}).min(1, {message: "Product name cannot be empty"}),
    image: z.instanceof(File, {message: "Product image is required"}),
    description: z.string({message: "Product description is required"}),
    price: z.number({message: "Product price is required"}),

})
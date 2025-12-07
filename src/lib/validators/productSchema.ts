import {z} from 'zod';
export const productSchema = z.object({
    name: z.string({message: "Name is required"}).min(1).max(100),
    image: z.instanceof(File, {message: "Image file is required"}),
    description: z.string().min(1),
    price: z.number({message: "Price must be a number"}).min(0),
});
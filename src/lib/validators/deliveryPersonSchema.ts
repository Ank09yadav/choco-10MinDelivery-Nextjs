import {z} from 'zod';

export const deliveryPersonSchema = z.object({
    name: z.string({message:"name should be string"}).min(1).max(100),
    phone:z
        .string({message:"phone number should be string"})  
        .min(10,{message:"phone number should be at least 10 digits"})
        .max(13,{message:"phone number should be at most 13 digits"})
        .regex(/^\+?[0-9]{10,13}$/, {message: "phone number must contain only digits and optional leading +"}),
    warehouseId: z.number({message:"warehouseId must be a number"}).int().positive(),
    orderId: z.number({message:"orderId must be a number"}).int().positive().optional(),
});
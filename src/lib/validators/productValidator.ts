import { z } from "zod";

const isServer = typeof window === "undefined";

export const productValidator = z.object({
    name: z.string({ message: "Product name is required" }).min(1, { message: "Product name cannot be empty" }),
    image: z.any()
        .optional()
        .refine((val) => {
            if (!val) return true; // Optional

            if (isServer) {
                // On server, check if it's a File. We allow size 0 which means no file uploaded.
                return val instanceof File;
            } else {
                // On client, allow empty FileList or a FileList with a file.
                return val instanceof FileList || typeof val === "string";
            }
        }, "Invalid image format"),
    description: z.string({ message: "Product description is required" }),
    price: z.number({ message: "Product price is required" }).min(0, "Price must be positive"),
});
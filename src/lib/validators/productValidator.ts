import { z } from "zod";

const isServer = typeof window === "undefined";

export const productValidator = z.object({
    name: z.string({ message: "Product name is required" }).min(1, { message: "Product name cannot be empty" }),
    image: z.any()
        .refine((val) => {
            if (isServer) {
                // On server/Node, FormData parsed image is a single File object
                return val instanceof File;
            } else {
                // On client/browser, it's a FileList from the input type="file"
                return val instanceof FileList && val.length > 0;
            }
        }, "Product image is required"),
    description: z.string({ message: "Product description is required" }),
    price: z.number({ message: "Product price is required" }).min(0, "Price must be positive"),
});
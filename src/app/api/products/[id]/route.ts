import { db } from "@/lib/DB/db";
import { products } from "@/lib/DB/schema";
import { eq } from "drizzle-orm";


export async function GET(request: Request, {params} : { params: Promise<{ id: string }> } ) {
    
    const id =  (await params).id;

    try {
        const product = await db.select().from(products).where(eq(products.id, Number(id))).limit(1);
    
        if(product.length === 0) {
            return Response.json({message: "Product not found"}, {status: 404});
        }
        
        return Response.json(product[0], {status: 201});
    } catch (error) {
        return Response.json({message: "Failed to fetch product"}, {status: 500});
    }
} 


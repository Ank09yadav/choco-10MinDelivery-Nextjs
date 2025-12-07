import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request, {params}:{params: Promise<{params: {id: string}}>} ) {
    try {

        const resolvedParams = await params;
        const id = Number(resolvedParams.id);

        // Safety check: Ensure ID is valid before querying DB
        if (isNaN(id)) {
            return Response.json({ message: 'Invalid ID format' }, { status: 400 });
        }
        const product = await db.select().from(products).where(eq(products.id, id)).limit(1);

        if(!product || product.length === 0) {
                return Response.json({ message: 'Product not found' }, { status: 404 });
        }
        return Response.json({ product: product[0] }, { status: 200 });
       
    } catch (error) {
        console.error("Database Retrieval Error:", error); // Log the actual error
        return Response.json({ message: 'Failed to retrieve product.' }, { status: 500 });
        
    }
}
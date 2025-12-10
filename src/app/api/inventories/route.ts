import { db } from "@/lib/db/db";
import { inventories, products, warehouse } from "@/lib/db/schema";
import { inventorySchema } from "@/lib/validators/inventorySchema";
import { productSchema } from "@/lib/validators/productSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
    const requestData = await request.json();
    let validateData ;
    try {
        validateData= await inventorySchema.parse(requestData);

    } catch (error) {
        return Response.json({message:error}, {status:400});
    }
    //insert into DB
    try {
        console.log(validateData);
        await db.insert(inventories).values(validateData);
        
        return Response.json({message:"Inventory stored successfully."}, {status:201});
    } catch (error) {
        console.log(error);
        return Response.json({message:"Failed to store inventory."}, {status:500});
    }
}

export async function GET() {
    try {
        const allInventories= await db.select({
            id:inventories.id,
            sku:inventories.sku,
            warehouse:warehouse.name,
            product:products.name
        })
        .from(inventories)
        .leftJoin(warehouse,eq(inventories.warehouseId,warehouse.id))
        .leftJoin(products,eq(inventories.productId,products.id))
        .orderBy(desc(inventories.id));
        return Response.json({inventories:allInventories}, {status:200});
    }catch (error) {
        return Response.json({message:"Failed to fetch inventories."}, {status:500});
    }
}
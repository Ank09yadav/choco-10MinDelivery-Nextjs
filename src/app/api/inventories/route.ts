import { db } from "@/lib/DB/db";
import { inventories, products, warehouses } from "@/lib/DB/schema";
import { inventoryValidator } from "@/lib/validators/inventoryValidator";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
    // TODO : check user access rights

    const data = await request.json();

    let validatedData;

    try {
        validatedData = inventoryValidator.parse(data);
    } catch (error) {
        return Response.json({message: error}, {status: 400});
    }

    try {
        await db.insert(inventories).values(validatedData);
        return Response.json({message: "Inventory created successfully"}, {status: 201});   
    } catch (error) {
        return Response.json({message: "Failed to create inventory"}, {status: 500});
    }
}

export async function GET(){

    try{
        const allInventories = await db.select({
            id: inventories.id,
            sku: inventories.sku,
            warehouse: warehouses.name,
            product: products.name,
            ordersId: inventories.ordersId

        }
        ).from(inventories).leftJoin(warehouses, eq(inventories.warehouseId, warehouses.id)).leftJoin(products, eq(inventories.productId, products.id)).orderBy(desc(inventories.id));
        return Response.json({inventories: allInventories}, {status: 201});
    }catch(error){
        return Response.json({message: "Failed to fetch inventories"}, {status: 500});
    }
}
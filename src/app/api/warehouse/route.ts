import { db } from "@/lib/DB/db";
import { warehouses } from "@/lib/DB/schema";
import { warehouseValidator } from "@/lib/validators/warehouseValidator";
import { desc } from "drizzle-orm";

export async function POST(request: Request){
    // TODO : check user access rights

    const data = await request.json();

    let validatedData;

    try {
        validatedData = warehouseValidator.parse(data)
    } catch (error) {
        return Response.json({message: error}, {status: 400});
    }

    try {
        await db.insert(warehouses).values(validatedData);
        return Response.json({message: "Warehouse created successfully"}, {status: 201});   
    } catch (error) {
        return Response.json({message: "Failed to create warehouse"}, {status: 500});
    }   
}

export async function GET(){

    try{
        const allWarehouses = await db.select().from(warehouses);
        return Response.json({warehouses: allWarehouses}, {status: 201});
    }catch(error){
        return Response.json({message: "Failed to fetch warehouses"}, {status: 500});
    }
} 
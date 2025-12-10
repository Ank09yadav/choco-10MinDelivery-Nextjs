import { db } from "@/lib/db/db";
import { deliveryPersonSchema } from "@/lib/validators/deliveryPersonSchema";
import { deliveryPersons, warehouse } from "@/lib/db/schema"; // or the correct path to your table definition
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
    const requestData = await request.json();
    let validateData ;
    try {
        
        validateData= await deliveryPersonSchema.parse(requestData);
       

    } catch (error) {
        return Response.json({message:error}, {status:400});
    }
    // Insert into DB
    try {
        await db.insert(deliveryPersons).values(validateData);
        return Response.json({message:"Delivery person stored successfully."}, {status:201});
    } catch (error) {
        return Response.json({message:"Failed to store delivery person."}, {status:500});
    }
}

export async function GET() {
    try {
        const allDeliveryPersons= await db.select().from(deliveryPersons).leftJoin(warehouse,eq(deliveryPersons.warehouseId,warehouse.id)).orderBy(desc(deliveryPersons.id));
        return Response.json({deliveryPersons:allDeliveryPersons}, {status:200});
    }catch (error) {
        return Response.json({message:"Failed to fetch delivery persons."}, {status:500});
    }
}
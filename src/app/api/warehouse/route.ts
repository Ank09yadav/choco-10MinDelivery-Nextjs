import { db } from "@/lib/db/db";
import { warehouse } from "@/lib/db/schema";
import { warehouseSchema } from "@/lib/validators/warehouseSchema";

export async function POST(request: Request) {
    const requestData = await request.json();
    //check auth later


    let validateData ;

    try {
        validateData= await warehouseSchema.parse(requestData);
    } catch (error) {
        return Response.json({message:error}, {status:400});
    }

    try {
        await db.insert(warehouse).values(validateData);
        return Response.json({message:"Warehouse stored successfully."}, {status:201});
    } catch (error) {
        return Response.json({message:"Failed to store the warehouse."}, {status:500});
    }


}